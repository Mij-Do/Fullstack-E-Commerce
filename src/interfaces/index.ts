export interface IProduct {
    id: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    categories: {
        id: number;
        documentId: string;
        title: string;
    };
    thumbnail: {
        id: number;
        documentId: string;
        name: string;
        url: string;
    };
}
