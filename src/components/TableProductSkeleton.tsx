import { Table, Skeleton } from "@chakra-ui/react";

const TableProductSkeleton = () => {
    return (
        <Table.Root size="sm" striped>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Product</Table.ColumnHeader>
                    <Table.ColumnHeader>Category</Table.ColumnHeader>
                    <Table.ColumnHeader>Price</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Act</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Array.from({ length: 10 }).map((_, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>
                            <Skeleton height="16px" width="120px" />
                        </Table.Cell>
                        <Table.Cell>
                            <Skeleton height="16px" width="80px" />
                        </Table.Cell>
                        <Table.Cell>
                            <Skeleton height="16px" width="70px" />
                        </Table.Cell>
                        <Table.Cell display={"flex"} spaceX={2} justifyContent={"flex-end"}>
                            <Skeleton height="16px" width="40px" bg={"red.400"}/>
                            <Skeleton height="16px" width="40px" bg={"purple.400"}/>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export default TableProductSkeleton;
