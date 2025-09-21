import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    cancelBtn?: string;
    okBtn?: string;
    isRemoving?: boolean;
    onRemoveHandler: () => void;
}

const Modal = ({isOpen, onClose, title, description, okBtn = "Remove", cancelBtn = "Cancel", onRemoveHandler, isRemoving}: IProps) => {
    return (
        <Dialog.Root open={isOpen} onInteractOutside={onClose} onEscapeKeyDown={onClose}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                {description}
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" onClick={onClose}>{cancelBtn}</Button>
                            </Dialog.ActionTrigger>
                            <Button 
                                variant={"solid"} 
                                bg={"red.500"} 
                                _hover={{bg: "red.300"}} 
                                loading={isRemoving}
                                onClick={onRemoveHandler}>
                                {okBtn}
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={onClose}/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default Modal;
