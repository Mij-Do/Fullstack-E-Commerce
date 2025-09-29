import { RouterProvider } from "react-router-dom";
import router from "./router";
import DrawerCart from "./components/DrawerCart";
import { Toaster } from "./components/ui/toaster";

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