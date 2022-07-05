import {action, makeObservable, observable} from "mobx";

export class Store {
    @observable showBurgerMenu = false;

    constructor() {
        makeObservable(this)
    }

    @action.bound
    setShowBurgerMenu(showBurgerMenu: boolean) {
        this.showBurgerMenu = showBurgerMenu;
    }
}
export const store = new Store()