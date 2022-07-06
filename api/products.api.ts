import {IProduct, ProductUpdateType} from "../types/product.types";
import {instanceCRUD} from "./axios";

interface IResponseProduct<T> {
    message: string
    data: T
}

export const productsAPI = {
    getAll: {
        key: "/",
        fetcher: async (url: string): Promise<IProduct[]> => {
            const response = await instanceCRUD.get<IProduct[]>(url);
            return response.data;
        }
    },
    getById: {
        key: (id: string) => `/${id}`,
        fetcher: async (url: string): Promise<IProduct> => {
            let response = await instanceCRUD.get<IProduct>(url);
            return response.data;
        }
    },
    create: async (createProduct: ProductUpdateType): Promise<string> => {
        let response = await instanceCRUD.post<string>(`/`, createProduct);
        return response.data;
    },
    update: async ({updateProduct, id}: {updateProduct: ProductUpdateType, id: string}): Promise<IProduct> => {
        let response = await instanceCRUD.put<IResponseProduct<IProduct>>(`/${id}`, updateProduct);
        return response.data.data;
    },
    delete: async (id: string): Promise<string> => {
        let response = await instanceCRUD.delete<string>(`/${id}`);
        return response.data;
    },
}