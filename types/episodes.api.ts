import {IInfo} from "./characters.types";

export interface IEpisodesResponse {
    info: IInfo
    results: IEpisode[]
}

export interface IEpisode{
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
}