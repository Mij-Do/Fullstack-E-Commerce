import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { onCloseCartDrawerAction } from "../app/features/globalSlice";
import ViewProductsInDrawer from "./ViewProductsInDrawer";
import { removeProductsFromCart } from "../app/features/cartSlice";

const DrawerCart = () => {
    const {isOpenCartDrawer} = useSelector((state: RootState) => state.global);
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const onCloseDrawer = () => dispatch(onCloseCartDrawerAction());
    const clearAllItemsFromCart = () => {
        dispatch(removeProductsFromCart([]));
    }
    return (
        <Drawer.Root open={isOpenCartDrawer} onInteractOutside={onCloseDrawer}>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Cart</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            {cartItems.map(product => <ViewProductsInDrawer key={product.id} product={product}/>)}
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button bg={"red.700"} _hover={{bg: "red.600"}} onClick={clearAllItemsFromCart}>Clear All</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={onCloseDrawer}/>
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default DrawerCart;