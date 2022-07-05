import {useContext} from "react";
import {Store} from "../store/store";
import {StoreContext} from "../pages/_app";

export const useStore = (): Store => useContext(StoreContext)