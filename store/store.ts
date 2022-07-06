import {action, makeObservable, observable} from "mobx";
import {ISnackbar} from "../types/product.types";

export class Store {
    @observable showBurgerMenu = false;
    @observable snackbar = {
        open: false,
        message: "",
        severity: "success"
    } as ISnackbar

    constructor() {
        makeObservable(this)
    }

    @action.bound
    setShowBurgerMenu(showBurgerMenu: boolean) {
        this.showBurgerMenu = showBurgerMenu;
    }

    @action.bound
    setSnackbar(snackbar: ISnackbar) {
        this.snackbar = snackbar;
    }

}
export const store = new Store()