import { Table, Skeleton, SkeletonCircle, Flex } from "@chakra-ui/react";

const TableProductSkeleton = () => {
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
                        <Table.Cell>
                            <SkeletonCircle height="50px" width="50px" />
                        </Table.Cell>
                        <Table.Cell>
                            <Skeleton height="16px" width="70px" />
                        </Table.Cell>
                        <Table.Cell>
                            <Skeleton height="16px" width="70px" />
                        </Table.Cell>
                        <Table.Cell>
                            <Flex alignItems={"center"} justifyContent={"flex-end"} spaceX={2}>
                                <Skeleton height="16px" width="40px" bg={"blue.400"}/>
                                <Skeleton height="16px" width="40px" bg={"red.400"}/>
                                <Skeleton height="16px" width="40px" bg={"purple.400"}/>
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
    );
};

export default TableProductSkeleton;
