import { Button, Field, Flex, Image, Input, Stack, Table, useDisclosure } from "@chakra-ui/react";
import TableProductSkeleton from "./TableProductSkeleton";
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery } from "../app/services/productsApiSlice";
import type { IProduct } from "../interfaces";
import Modal from "../shared/Modal";
import {FiTrash, FiPenTool, FiEye} from "react-icons/fi"
import toast from "react-hot-toast";
import { useEffect, useState, type ChangeEvent } from "react";


const DashboardProductTable = () => {
    const defaultValue: IProduct = {
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
    const [removeProductId, setRemoveProductId] = useState('');
    const [productToEdit, setProductToEdit] = useState<IProduct>(defaultValue);
    const {open, onOpen, onClose} = useDisclosure();
    const {open: isOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();
    const {isLoading, data} = useGetDashboardProductsQuery(0);
    const [removeProduct, {isLoading: isRemoving, isSuccess}] = useDeleteDashboardProductsMutation();
    
    useEffect(() => {
        if (isSuccess) {
            setRemoveProductId('');
            toast.success("Product is Removed");
        }
    }, [isSuccess])

    // handler
    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;

        setProductToEdit({
            ...productToEdit,
            [name]: value,
        })
    }
    
    const onRemoveHandler = () => {
        removeProduct(removeProductId);
        onClose();
    }

    if (isLoading) return  <TableProductSkeleton />;
    return (
        <>
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
                        <Table.Cell>{product.categories.map(title => title.title)}</Table.Cell>
                        <Table.Cell>
                            <Image 
                                src={`${import.meta.env.VITE_SERVER}${product.thumbnail.url}`} 
                                alt={product.thumbnail.name}
                                w={"15%"} h={"15%"}
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
                                    onModalOpen();
                                }}
                                >
                                    <FiPenTool />
                                </Button>
                                <Button w={5} bg={"red.400"} _hover={{bg: "red.200"}} onClick={() => {
                                    setRemoveProductId(product.documentId);
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

            {/* update modal */}
            <Modal title="Update Product" isOpen={isOpen} onClose={onModalClose} okBtn="Done">
                <Stack gap="4">
                    <Field.Root>
                        <Field.Label>Product Title</Field.Label>
                        <Input name="title" value={productToEdit.title} onChange={onChangeHandler}/>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Product Price</Field.Label>
                        <Input name="price" value={productToEdit.price} onChange={onChangeHandler}/>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Product Stock</Field.Label>
                        <Input name="stock" value={productToEdit.stock} onChange={onChangeHandler}/>
                    </Field.Root>
                </Stack>
            </Modal>

            {/* remove modal */}
            <Modal 
                isOpen={open} 
                onClose={onClose} 
                title="Are You Sure ?" 
                description="Remove Product description" 
                onRemoveHandler={onRemoveHandler}
                isRemoving={isRemoving}
            />
        </>
    )
}

export default DashboardProductTable;