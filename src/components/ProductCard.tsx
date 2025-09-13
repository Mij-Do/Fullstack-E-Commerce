import { useColorMode } from "@chakra-ui/color-mode";
import { Button, Card, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = () => {
    const {colorMode} = useColorMode();
return (
    <Card.Root overflow="hidden" border={"1px solid gray.300"}>
        <Card.Body gap="2">
            <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                rounded={"md"}
            />
            <Stack spaceY={2} mt={2}>
                <Card.Title>Living room Sofa</Card.Title>
                <Card.Description>
                    This sofa is perfect for modern tropical spaces, baroque inspired
                    spaces.
                </Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    $450
                </Text>
                <Button 
                asChild
                bg={colorMode === "light" ? "#9f7aea" : "#2d2146ff"}
                _hover={{
                    bg: colorMode === "light" ? "#2d2146ff" : "#9f7aea",
                    border: "transparent",
                }}
                >
                    <Link to="/products/1">View Details</Link>
                </Button>
            </Stack>
        </Card.Body>
    </Card.Root>
)
}

export default ProductCard;
