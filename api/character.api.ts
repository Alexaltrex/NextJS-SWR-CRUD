import {ICharacter, ICharactersResponse, IInfo} from "../types/characters.types";
import {instanceRAM} from "./axios";
import {getIdFromUrlCharacter} from "../helpers/helpers";

export const charactersAPI = {
    getInfo: {
        key: "character",
        fetcher: async (url: string): Promise<IInfo> => {
            const response = await instanceRAM.get<ICharactersResponse>(url);
            return response.data.info
        }
    },
    getAll: {
        key: (page: string) => `character/?page=${page}`,
        fetcher: async (url: string):Promise<ICharacter[]> => {
            const response = await instanceRAM.get<ICharactersResponse>(url);
            return response.data.results
        }
    },
    getInfinite: {
        key: (pageIndex: number, previousPageData: ICharacter[][] | null) => {
            if (previousPageData && !previousPageData.length) return null // достигнут конец
            return `character/?page=${pageIndex + 1}`                    // ключ SWR
        },
        fetcher: async (url: string): Promise<ICharacter[]> => {
            const response = await instanceRAM.get<ICharactersResponse>(url);
            return response.data.results
        }
    },
    getById: {
        key: (id: string) => `character/${id}`,
        fetcher: async (url: string):Promise<ICharacter> => {
            const response = await instanceRAM.get<ICharacter>(url);
            return response.data
        },
    },
    getMultipleItems: {
        key: (urls: string[] | null) => urls
            ? `character/[${urls.map(url => getIdFromUrlCharacter(url)).join(",")}]`
            : null,
        fetcher: async (url: string): Promise<ICharacter[]> => {
            const response = await instanceRAM.get<ICharacter[]>(url);
            return response.data
        }
    }
}