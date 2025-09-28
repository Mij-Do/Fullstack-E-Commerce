import type { IProduct } from "../interfaces";

export const addToCart = (cartItem: IProduct[], product: IProduct) => {
    const exists = cartItem.find(item => item.id === product.id);

    if (exists) {
        return cartItem.map(item => item.id === product.id ? {...item, qty: item.qty! + 1} : item);
    }

    return [...cartItem, {...product, qty: 1}];
}


export const txtLength = (txt: string, max: number) => {
    if (txt.length > max) {
        return `${txt.slice(0, max)}...`;
    }
}