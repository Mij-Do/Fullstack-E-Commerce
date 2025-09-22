import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: ReactNode;
    description?: string;
}

const Modal = ({isOpen, onClose, title, description, children}: IProps) => {
    return (
        <Dialog.Root open={isOpen} onInteractOutside={onClose} onEscapeKeyDown={onClose}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header  display={"flex"} flexDirection={"column"}>
                            <Dialog.Title>{title}</Dialog.Title>
                            <p>
                                {description}
                            </p>
                        </Dialog.Header>
                        <Dialog.Body>
                            {children}
                        </Dialog.Body>
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
