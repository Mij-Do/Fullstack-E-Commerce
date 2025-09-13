import { Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

interface IProps {

}

const ProductsPage = ({}: IProps) => {
    return (
        <Box margin={10}>
            <ProductCard />
        </Box>
    )
}

export default ProductsPage;