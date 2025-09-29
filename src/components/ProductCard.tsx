import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import type { IProduct } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../app/features/cartSlice";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";
import { txtLength } from "../utils";
import { useTheme } from "next-themes";

interface IProps {
    product: IProduct;
}

const ProductCard = ({product}: IProps) => {
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const {thumbnail, title, description, price, categories, documentId} = product;
    const { theme } = useTheme();
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
    const renderCategory = categories?.map(category => (
        <Text textStyle="md" mt="2">
            {category.title}
        </Text>
    ))
return (
    <Card.Root overflow="hidden" border={"1px solid gray.300"}>
        <Card.Body gap="2">
            <Image
                src={`${thumbnail?.url}`}
                alt="Green double couch with wooden legs"
                boxSize={"200px"}
                rounded={"md"}
                mx={"auto"}
            />
            <Box blockSize={200} display={"flex"} flexDir={"column"} spaceY={2} mt={2} textAlign={"center"} justifyContent={"space-between"}>
                <Card.Title>{title}</Card.Title>
                <Card.Description>
                    {txtLength(description, 20)}
                </Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    ${price}
                </Text>
                {renderCategory}
                <Box display={"flex"} spaceX={1} justifyContent={"space-between"}>
                    <Button 
                        asChild
                        w={"50%"}
                        bg={theme === "light" ? "#9f7aea" : "#2d2146ff"}
                        _hover={{
                            bg: theme === "light" ? "#2d2146ff" : "#9f7aea",
                            border: "transparent",
                        }}
                        color={theme === "dark" ? "white" : "white"}
                    >
                        <NavLink to={`${documentId}`}>View Details</NavLink>
                    </Button>
                    <Button
                        w={"50%"}
                        bg={theme === "light" ? "#2d2146ff" : "#9f7aea"}
                        _hover={{
                            bg: theme === "light" ? "#9f7aea" : "#2d2146ff",
                            border: "transparent",
                        }}
                        color={theme === "dark" ? "white" : "white"}
                        onClick={addProduct}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Card.Body>
    </Card.Root>
)
}

export default ProductCard;
