export interface IProduct {
    id?: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    categories: [{
        documentId?: string;
        id?: number;
        title: string;
    }];
    thumbnail: {
        id?: number;
        documentId?: string;
        name: string;
        url: string;
    };
    qty?: number;
}


export interface IUser {
    id?: number;
    documentId: string;
    identifier: string;
    password: string;
}

export interface IResponse {
    jwt: string;
    user: IUser;
}

export interface ApiErrorData {
        data: null;
        error: {
            message: string;
            name?: string;
            status?: number;
        };
}