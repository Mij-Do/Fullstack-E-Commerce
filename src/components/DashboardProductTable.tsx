import { Button, Flex, Image, Table } from "@chakra-ui/react"
import TableProductSkeleton from "./TableProductSkeleton"
import { useGetDashboardProductsQuery } from "../app/services/apiSlice";
import type { IProduct } from "../interfaces";

const DashboardProductTable = () => {
    const {isLoading, data, error} = useGetDashboardProductsQuery(0);
    console.log({isLoading, data, error})
    if (true) return  <TableProductSkeleton />;
    return (
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
                {data.data.map((product: IProduct) => (
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
                            <Button></Button>
                            <Button></Button>
                            <Button></Button>
                        </Flex>
                    </Table.Cell>
                </Table.Row>
                ))}
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
    )
}

export default DashboardProductTable;