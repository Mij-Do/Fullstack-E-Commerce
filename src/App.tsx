import { RouterProvider } from "react-router-dom";
import router from "./router";
import {Toaster} from "react-hot-toast";
import DrawerCart from "./components/DrawerCart";

const App = () => {
    return (
        <>
          <RouterProvider router={router} />
          <DrawerCart />
          <Toaster />
        </>
    )
}

export default App;