import {
    Card,
    Skeleton,
    SkeletonText,
    Stack,
} from "@chakra-ui/react"

const ProductSkeleton = () => {
    return (
        <Card.Root overflow="hidden" border={"1px solid gray.300"}>
            <Card.Body gap="2">
                <Skeleton height="200px" />
                <Stack spaceY={2} mt={2} w="full">
                    <Skeleton height="20px" width="70%" />
                    <SkeletonText noOfLines={2} />
                    <Skeleton height="20px" width="40%" />
                    <Skeleton height="40px" width="full" rounded="md" />
                </Stack>
            </Card.Body>
        </Card.Root>
    )
}

export default ProductSkeleton;
