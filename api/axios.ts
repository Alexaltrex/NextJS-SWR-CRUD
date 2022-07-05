import axios from "axios";

export const instanceRAM = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
});