import {IInfo} from "./characters.types";

export interface ILocationsResponse {
    info: IInfo
    results: ILocation[]
}

export interface ILocation {
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
}