import axios from "axios";

export const instanceRAM = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
});

export const BaseUrlCrud = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4444/rtkquery/product/'
    //? "https://alexaltrex-common-api.herokuapp.com/rtkquery/product/"
    : "https://alexaltrex-common-api.herokuapp.com/rtkquery/product/"

export const instanceCRUD = axios.create({
    baseURL: BaseUrlCrud
});

