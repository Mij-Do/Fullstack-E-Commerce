import { Box, Button, Card, Image, Stack, Text } from "@chakra-ui/react";
import type { IProduct } from "../interfaces";
import { useColorMode } from "@chakra-ui/color-mode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../app/features/cartSlice";

interface IProps {
    product: IProduct;
}

const ViewProduct = ({product}: IProps) => {
    const {colorMode} = useColorMode();
    const navigate = useNavigate();
    const {title, thumbnail, description} = product;
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `product ${title}`;
    }, []);

    const backHandler = () => {
        document.title = "FullStack E-commerce";
        navigate(-1);
    }
    const addProduct = () => {
        dispatch(addProductToCart(product));
    }
    return (
        <Box m={2} spaceY={4} mx={"auto"} display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Button onClick={backHandler}>
                <FaArrowLeft /> Back
            </Button>
            <Card.Root maxW={"md"} overflow="hidden" border={"1px solid gray.300"}>
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
        </Box>
    )
}

export default ViewProduct;