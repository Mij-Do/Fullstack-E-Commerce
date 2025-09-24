import { useEffect, useRef, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

interface IProps {
    children: ReactNode;
}

const InternetConnectionProvider = ({children}: IProps) => {
    const [isOnline, setIsOnline] = useState(true);
    const toastRef = useRef('');

    useEffect(() => {
        setIsOnline(navigator.onLine);
    }, []);

    window.addEventListener("online", () => {
        setIsOnline(true);
    });
    
    window.addEventListener("offline", () => {
        setIsOnline(false);
    });

    const addToast = () => {
        if (!isOnline) {
            toastRef.current = toast.error("You are Offline", { duration: 10000 });
        }
    }

    if(!isOnline) {
        return <>{children} {addToast()}</>;
    }

    return children;
}

export default InternetConnectionProvider;