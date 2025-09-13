import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

interface IProps {

}

const ProductsPage = ({}: IProps) => {
    return (
        <Grid m={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={4}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </Grid>
    )
}

export default ProductsPage;