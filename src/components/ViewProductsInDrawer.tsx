import { Flex, Image, Stack, Text, Button } from "@chakra-ui/react";

import type { IProduct } from "../interfaces";
import { useDispatch } from "react-redux";
import { removeProductsFromCart } from "../app/features/cartSlice";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

interface IProps {
    product: IProduct;
}

const ViewProductsInDrawer = ({product}: IProps) => {
    const dispatch = useDispatch();
    const {thumbnail, title, price, qty, id} = product;

    const onRemoveProductFromCart = () => {
        dispatch(removeProductsFromCart(id));
        toast.success("Product is Removed");
    }
    return (
        <Flex 
            direction={"column"} 
            alignItems={"center"} 
            spaceY={3} 
            border={"1px solid gray"} p={2} mb={2} 
            rounded={"md"}>
            <Image 
                src={`${thumbnail?.url}`} 
                alt={thumbnail.name}
                w={"100px"}
            />
            <Stack textAlign={"center"} color={"gray.400"}>
                <Text>Title: {title}</Text>
                <Text>Price: ${price}</Text>
                <Text>Quantity: {qty}</Text>
            </Stack>
            <Button w={"full"} bg={"red.500"} _hover={{bg: "red.400"}} onClick={onRemoveProductFromCart}> <FaTrash /> Remove</Button>
        </Flex>
    )
}

export default ViewProductsInDrawer;