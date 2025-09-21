import { useColorMode } from "@chakra-ui/color-mode";
import { Button, Card, Image, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import type { IProduct } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../app/features/cartSlice";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";

interface IProps {
    product: IProduct;
}

const ProductCard = ({product}: IProps) => {
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const {thumbnail, title, description, documentId} = product;
    const {colorMode} = useColorMode();
    const dispatch = useDispatch();

    const addProduct = () => {
        dispatch(addProductToCart(product));
        const exists = cartItems.find(item => item.documentId === documentId);
        if (exists) {
            toast.success("Increased Product Quantity Because Product already Added");
        } else {
            toast.success("Product Added to Your Cart Successfully");
        }
    }
    
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
                    <NavLink to={`${documentId}`}>View Details</NavLink>
                </Button>
                <Button
                    bg={colorMode === "light" ? "#9f7aea" : "#2d2146ff"}
                    _hover={{
                        bg: colorMode === "light" ? "#2d2146ff" : "#9f7aea",
                        border: "transparent",
                    }}
                    onClick={addProduct}
                >
                    Add to Cart
                </Button>
            </Stack>
        </Card.Body>
    </Card.Root>
)
}

export default ProductCard;
