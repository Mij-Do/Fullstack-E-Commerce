import { useEffect, useRef, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

interface IProps {
    children: ReactNode;
}

const InternetConnectionProvider = ({children}: IProps) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const dispatch = useDispatch();
    const toastRef = useRef<string | null>('');

    const setOnline = () => {
        setIsOnline(true);
        dispatch(networkMode(true));
        if (toastRef.current) {
            toast.dismiss(toastRef.current);
            toastRef.current = null;
        }

        toast.success("You are back Online ✅", { duration: 4000 });
    }
    const setOffline = () => {
        setIsOnline(false);
        dispatch(networkMode(false));

        if (!toastRef.current) {
            toastRef.current = toast.error("You are Offline ❌", { duration: 10000 });
        }
    }

    useEffect(() => {
        window.addEventListener("online", setOnline);
        window.addEventListener("offline", setOffline);

        return () => {
            window.removeEventListener("online", setOnline);
            window.removeEventListener("offline", setOffline);
        }
    }, []);

    if(!isOnline) {
        return <>{children}</>;
    }

    return children;
}

export default InternetConnectionProvider;