import { useColorMode } from "@chakra-ui/color-mode";
import { Button, Card, Image, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import type { IProduct } from "../interfaces";

interface IProps {
    product: IProduct;
}

const ProductCard = ({product}: IProps) => {
    const {thumbnail, title, description, id} = product;
    const {colorMode} = useColorMode();
    
return (
    <Card.Root overflow="hidden" border={"1px solid gray.300"}>
        <Card.Body gap="2">
            <Image
                src={`${import.meta.env.VITE_SERVER}${thumbnail?.url}`}
                alt="Green double couch with wooden legs"
                boxSize={"200px"}
                rounded={"md"}
                mx={"auto"}
            />
            <Stack spaceY={2} mt={2}>
                <Card.Title>{title}</Card.Title>
                <Card.Description>
                    {description}
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
                    <NavLink to={`${id}`}>View Details</NavLink>
                </Button>
            </Stack>
        </Card.Body>
    </Card.Root>
)
}

export default ProductCard;
