import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { onCloseCartDrawerAction } from "../app/features/globalSlice";

const DrawerCart = () => {
    const {isOpenCartDrawer} = useSelector((state: RootState) => state.global);
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const onCloseDrawer = () => dispatch(onCloseCartDrawerAction());
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
                            {cartItems.map(product => <h2 key={product.id}>{product.title}: {product.qty} Items</h2>)}
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button bg={"red.500"} _hover={{bg: "red.400"}}>Clear All</Button>
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