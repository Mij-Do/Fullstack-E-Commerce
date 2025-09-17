import { Flex, Image, Stack, Text, Button } from "@chakra-ui/react";

import type { IProduct } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { removeProductsFromCart } from "../app/features/cartSlice";

interface IProps {
    product: IProduct;
}

const ViewProductsInDrawer = ({product}: IProps) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const {thumbnail, title, price, qty, id} = product;

    const onRemoveProductFromCart = () => {
        const filter = cartItems.filter(pro => pro.id !== id);
        if (filter) {
            dispatch(removeProductsFromCart(filter));
        }
    }
    return (
        <Flex 
            direction={"column"} 
            alignItems={"center"} 
            spaceY={3} 
            border={"1px solid gray"} p={2} mb={2} 
            rounded={"md"}>
            <Image 
                src={`${import.meta.env.VITE_SERVER}${thumbnail?.url}`} 
                alt={thumbnail.name}
                w={"100px"}
            />
            <Stack textAlign={"center"} color={"gray.400"}>
                <Text>Title: {title}</Text>
                <Text>Price: ${price}</Text>
                <Text>Quantity: {qty}</Text>
            </Stack>
            <Button w={"full"} bg={"red.500"} _hover={{bg: "red.400"}} onClick={onRemoveProductFromCart}>Remove</Button>
        </Flex>
    )
}

export default ViewProductsInDrawer;