import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../interfaces";
import ProductSkeleton from "../components/ProductSkeleton";


const ProductsPage = () => {
    const getProduct = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_SERVER}/api/products?populate=thumbnail&populate=categories`);
        return data;
    };

    const {isLoading, data} = useQuery({
        queryKey: [`product`], 
        queryFn: getProduct
    });
    localStorage.setItem("data", JSON.stringify(data?.data));
    
    if(isLoading) return 
    <Grid m={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={4}>
        {Array.from({length: 20}, (_, idx) => <ProductSkeleton key={idx}/>)}
    </Grid>;

    return (
        <Grid m={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={4}>
            {data?.data?.map((product: IProduct) => <ProductCard key={product.id} product={product}/>)}
        </Grid>
    )
}

export default ProductsPage;