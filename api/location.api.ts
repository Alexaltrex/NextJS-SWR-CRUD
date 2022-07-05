import {instanceRAM} from "./axios";
import {ILocation, ILocationsResponse} from "../types/locations.types";
import {ICharactersResponse, IInfo} from "../types/characters.types";

export const locationsAPI = {
    getInfo: {
        key: "location",
        fetcher: async (url: string):Promise<IInfo> => {
            let response = await instanceRAM.get<ILocationsResponse>(url);
            return response.data.info
        }
    },
    getAll: {
        key: "location",
        fetcher: async (url: string): Promise<ILocation[]> => {
            const resultWithTotalPageCount = await instanceRAM.get<ILocationsResponse>(url);
            const pages = resultWithTotalPageCount.data.info.pages;
            const arrPages = [];
            for (let i = 1; i <= pages; i++) {
                arrPages.push(i)
            }
            const arrayOfRequests = arrPages.map(page => instanceRAM.get<ILocationsResponse>(`location/?page=${page}`))
            const results = await Promise.all(arrayOfRequests);
            let locations = [] as ILocation[];
            for (let i = 0; i < pages; i++) {
                locations = [...locations, ...results[i].data.results]
            }
            return locations;
        }
    },
    getById: {
        key: (id: string) => `location/${id}`,
        fetcher: async (url: string): Promise<ILocation> => {
            let response = await instanceRAM.get<ILocation>(url);
            return response.data
        }
    },
}