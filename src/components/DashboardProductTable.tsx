import { Box, Button, Dialog, Field, Flex, Image, Input, Stack, Table, Textarea, useDisclosure } from "@chakra-ui/react";
import TableProductSkeleton from "./TableProductSkeleton";
import { useCreateDashboardProductsMutation, useDeleteDashboardProductsMutation, useGetDashboardProductsQuery, useUpdateDashboardProductsMutation, useUploadFileMutation } from "../app/services/productsApiSlice";
import type { IProduct, IUploadResponse } from "../interfaces";
import Modal from "../shared/Modal";
import {FiTrash, FiPenTool, FiEye} from "react-icons/fi";
import { useEffect, useState, type ChangeEvent } from "react";
import { toaster } from "./ui/toaster";


const DashboardProductTable = () => {
    const defaultValue: IProduct = {
        id: 0,
        documentId: '',
        title: "",
        description: "",
        price: 0,
        stock: 0,
        categories: [{
            title: "",
        }],
        thumbnail: {
            name: '',
            url: '',
        },
    }
    const [productId, setProductId] = useState<string>('');
    const [productToCreate, setProductToCreate] = useState<IProduct>(defaultValue);
    const [productToEdit, setProductToEdit] = useState<IProduct>(defaultValue);
    const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
    const {open, onOpen, onClose} = useDisclosure();
    const {open: isOpenUpdate, onOpen: onModalOpenUpdate, onClose: onModalCloseUpdate} = useDisclosure();
    const {open: isOpenCreate, onOpen: onModalOpenCreate, onClose: onModalCloseCreate} = useDisclosure();
    const {isLoading, data} = useGetDashboardProductsQuery(undefined);
    const [removeProduct, {isLoading: isRemoving, isSuccess}] = useDeleteDashboardProductsMutation();
    const [updateProduct, {isLoading: isUpdating, isSuccess: isUpdated}] = useUpdateDashboardProductsMutation();
    const [createProduct, {isLoading: isCreating, isSuccess: isCreated}] = useCreateDashboardProductsMutation();
    const [uploadFile] = useUploadFileMutation();
    useEffect(() => {
        if (isSuccess) {
            setProductId('');
            toaster.success({
                title: "Product is Removed"
            });
        }
        if (isUpdated) {
            setProductId('');
            toaster.success({
                title: "Product Updated"
            });
        }
    }, [isSuccess, isUpdated]);
    useEffect(() => {
        if (isCreated) {
            setProductId('');
            setProductToCreate(defaultValue);
            toaster.success({
                title: "Product is Created"
            });
        }
    }, [isCreated]);

    // handler
    const onSubmitHandlerCreate = async () => {
        onModalCloseCreate();
        const createData = {
            title: productToCreate.title,
            description: productToCreate.description,
            price: productToCreate.price,
            stock: productToCreate.stock,
        }; 

        try {
            const bodyPayload: any = { data: createData };

            if (thumbnail) {
                const formData = new FormData();
                formData.append("files", thumbnail);            

                const res: IUploadResponse[] = await uploadFile(formData).unwrap();
                const newThumbnailId = res[0].id;
                bodyPayload.data.thumbnail = newThumbnailId;
            }

            await createProduct(bodyPayload);

        } catch (err) {
            console.error(err);
            toaster.error({
                title: "Failed to create product"
            });
        }
    }

    const onSubmitHandlerUpdate = async () => {
        onModalCloseUpdate();
        const updatedData = {
            title: productToEdit.title,
            description: productToEdit.description,
            price: productToEdit.price,
            stock: productToEdit.stock,
        };

        try {
            const bodyPayload: any = { data: updatedData };

            if (thumbnail) {
                const formData = new FormData();
                formData.append("files", thumbnail);            

                const res: IUploadResponse[] = await uploadFile(formData).unwrap();
                const newThumbnailId = res[0].id;
                bodyPayload.data.thumbnail = newThumbnailId;
            }

            await updateProduct({
                documentId: productId,
                body: bodyPayload,
            });
            
        } catch (err) {
            console.error(err);
            toaster.error({
                title: "Failed to update product"
            });
            
        }
    }

    const onChangeHandlerUpdate = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = evt.target;

        setProductToEdit({
            ...productToEdit,
            [name]: value,
        })
        setProductToCreate({
            ...productToCreate,
            [name]: value,
        })
    }

    const onChangeThumbnail = (evt: ChangeEvent<HTMLInputElement>) => {
        const files = evt.target.files;
        if (files && files.length > 0) {
            setThumbnail(files[0]);
        }
    }
    
    const onRemoveHandler = () => {
        removeProduct(productId);
        onClose();
    }
    if (isLoading) return  <TableProductSkeleton />;
    return (
        <>
            <Flex flexDir={"column"} alignItems={"center"} spaceY={2}>
                <Button 
                    onClick={onModalOpenCreate}
                >
                    Create Product
                </Button>
                <Table.ScrollArea borderWidth="1px" w={"3xl"} rounded={"md"}>
                    <Table.Root size="sm" striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>ID</Table.ColumnHeader>
                                <Table.ColumnHeader>Title</Table.ColumnHeader>
                                <Table.ColumnHeader>Category</Table.ColumnHeader>
                                <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
                                <Table.ColumnHeader>Price</Table.ColumnHeader>
                                <Table.ColumnHeader>Stock</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data?.data?.length ? data?.data?.map((product: IProduct) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.id}</Table.Cell>
                                <Table.Cell>{product.title}</Table.Cell>
                                <Table.Cell>{product.categories?.map(category => category.title)}</Table.Cell>
                                <Table.Cell>
                                    <Image 
                                        src={product?.thumbnail?.url} 
                                        alt={product?.thumbnail?.name}
                                        w={"80px"} h={"60px"}
                                        rounded={"full"}
                                    />
                                </Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>{product.stock}</Table.Cell>
                                <Table.Cell>
                                    <Flex alignItems={"center"} spaceX={2} justifyContent={"flex-end"}>
                                        <Button w={5} bg={"blue.400"} _hover={{bg: "blue.200"}} 
                                        onClick={() => {
                                            setProductToEdit(product);
                                            setProductId(product.documentId);
                                            onModalOpenUpdate();
                                        }}
                                        >
                                            <FiPenTool />
                                        </Button>
                                        <Button w={5} bg={"red.400"} _hover={{bg: "red.200"}} onClick={() => {
                                            setProductId(product.documentId);
                                            onOpen();
                                        }}>
                                            <FiTrash />
                                        </Button>
                                        <Button w={5} bg={"purple.400"} _hover={{bg: "purple.200"}}>
                                            <FiEye />
                                        </Button>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                            )) 
                            :  <h2>You Have No Products ...</h2> }
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.ColumnHeader>ID</Table.ColumnHeader>
                                <Table.ColumnHeader>Title</Table.ColumnHeader>
                                <Table.ColumnHeader>Category</Table.ColumnHeader>
                                <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
                                <Table.ColumnHeader>Price</Table.ColumnHeader>
                                <Table.ColumnHeader>Stock</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Footer>
                    </Table.Root>
                </Table.ScrollArea>
            </Flex>

            {/* create modal */}
            <Modal title="Create Product" isOpen={isOpenCreate} onClose={onModalCloseCreate}>
                <Box spaceY={4}>
                    <Stack gap="4">
                        <Field.Root>
                            <Field.Label>Product Title</Field.Label>
                            <Input name="title" value={productToCreate.title} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Description</Field.Label>
                            <Textarea name="description" value={productToCreate.description} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Price</Field.Label>
                            <Input name="price" value={productToCreate.price} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Stock</Field.Label>
                            <Input name="stock" value={productToCreate.stock} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Thumbnail</Field.Label>
                            <Input id="thumbnail" type="file" h={"full"} p={2} onChange={onChangeThumbnail}/>
                        </Field.Root>
                    </Stack>
                    <Box display={"flex"} spaceX={2}>
                        <Dialog.ActionTrigger asChild>
                                <Button variant="outline" onClick={onModalCloseCreate}>Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button 
                            variant={"solid"} 
                            bg={"purple.500"} 
                            _hover={{bg: "purple.300"}}
                            loading={isCreating}
                            onClick={onSubmitHandlerCreate}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* update modal */}
            <Modal title="Update Product" isOpen={isOpenUpdate} onClose={onModalCloseUpdate}>
                <Box spaceY={4}>
                    <Stack gap="4">
                        <Field.Root>
                            <Field.Label>Product Title</Field.Label>
                            <Input name="title" value={productToEdit.title} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Description</Field.Label>
                            <Textarea name="description" value={productToEdit.description} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Price</Field.Label>
                            <Input name="price" value={productToEdit.price} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Stock</Field.Label>
                            <Input name="stock" value={productToEdit.stock} onChange={onChangeHandlerUpdate}/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Product Thumbnail</Field.Label>
                            <Input id="thumbnail" type="file" h={"full"} p={2} onChange={onChangeThumbnail}/>
                        </Field.Root>
                    </Stack>
                    <Box display={"flex"} spaceX={2}>
                        <Dialog.ActionTrigger asChild>
                                <Button variant="outline" onClick={onModalCloseUpdate}>Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button 
                            variant={"solid"} 
                            bg={"purple.500"} 
                            _hover={{bg: "purple.300"}}
                            loading={isUpdating}
                            onClick={onSubmitHandlerUpdate}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* remove modal */}
            <Modal 
                isOpen={open} 
                onClose={onClose} 
                title="Are You Sure ?" 
                description="Remove Product description"
            > 
                <Box display={"flex"} spaceX={2}>
                    <Dialog.ActionTrigger asChild>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button 
                        variant={"solid"} 
                        bg={"red.500"} 
                        _hover={{bg: "red.300"}}
                        loading={isRemoving}
                        onClick={onRemoveHandler}
                    >
                        Remove
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default DashboardProductTable;

