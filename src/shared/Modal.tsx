import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({isOpen, onClose}: IProps) => {
    return (
        <Dialog.Root open={isOpen} onInteractOutside={onClose} onEscapeKeyDown={onClose}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" onClick={onClose}>Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
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
