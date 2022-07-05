export interface IInfo {
    count: number
    pages: number
    prev: string | null
    next: string | null
}

interface IOrigin {
    name: string
    url: string
}

export interface ICharacter {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: IOrigin
    location: IOrigin
    image: string
    episode: string[]
    url: string
    created: string
}

export interface ICharactersResponse {
    info: IInfo
    results: ICharacter[]
}
