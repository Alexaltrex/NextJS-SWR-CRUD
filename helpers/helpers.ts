export const preUrlCharacter = 'https://rickandmortyapi.com/api/character/';
export const preUrlLocation = 'https://rickandmortyapi.com/api/location/';
export const preUrlEpisode = 'https://rickandmortyapi.com/api/episode/';

export const getIdFromUrlCharacter = (url: string): string => url.split(preUrlCharacter)[1];
export const getIdFromUrlLocation = (url: string): string => url.split(preUrlLocation)[1];
export const getIdFromUrlEpisode = (url: string): string => url.split(preUrlEpisode)[1];