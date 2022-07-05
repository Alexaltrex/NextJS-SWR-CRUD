import {IEpisode, IEpisodesResponse} from "../types/episodes.api";
import {instanceRAM} from "./axios";
import {getIdFromUrlEpisode} from "../helpers/helpers";
import {ICharactersResponse, IInfo} from "../types/characters.types";

export const episodesAPI = {
    getInfo: {
        key: "episode",
        fetcher: async (url: string):Promise<IInfo> => {
            let response = await instanceRAM.get<IEpisodesResponse>(url);
            return response.data.info
        }
    },
    getAll: {
        key: "episode",
        fetcher: async (url: string): Promise<IEpisode[]> => {
            const resultWithTotalPageCount = await instanceRAM.get<IEpisodesResponse>(url);
            const pages = resultWithTotalPageCount.data.info.pages;
            const arrPages = [];
            for (let i = 1; i <= pages; i++) {
                arrPages.push(i)
            }
            const arrayOfRequests = arrPages.map(page => instanceRAM.get<IEpisodesResponse>(`episode/?page=${page}`))
            const results = await Promise.all(arrayOfRequests);
            let episodes = [] as IEpisode[];
            for (let i = 0; i < pages; i++) {
                episodes = [...episodes, ...results[i].data.results]
            }
            return episodes;
        }
    },
    getById: {
        key: (id: string) => `episode/${id}`,
        fetcher: async (url: string): Promise<IEpisode> => {
            const response = await instanceRAM.get<IEpisode>(url);
            return response.data
        }
    },
    getMultipleItems: {
        key: (urls: string[] | null) => urls
            ? `episode/[${urls.map(url => getIdFromUrlEpisode(url)).join(",")}]`
            : null,
        fetcher: async (url: string): Promise<IEpisode[]> => {
            const response = await instanceRAM.get<IEpisode[]>(url);
            return response.data
        }
    }
}