import style from "./Header.module.scss"
import Link from "next/link";
import {useRouter} from "next/router";
import clsx from "clsx";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo.png";
import {svgIcons} from "../../assets/svg/svgIcons";
import src0 from "../../public/links/characters.jpg";
import src0_1 from "../../public/links/infinite.jpg";
import src1 from "../../public/links/locations.jpg";
import src2 from "../../public/links/episodes.jpg";
import src3 from "../../public/links/crud.jpg";
import {observer} from "mobx-react-lite";
import {useStore} from "../../hooks/useStore";

export const links = [
    {label: "characters", href: "/characters/1", slug: "characters", src: src0},
    {label: "infinite", href: "/infinite", slug: "infinite", src: src0_1},
    {label: "locations", href: "/locations", slug: "locations", src: src1},
    {label: "episodes", href: "/episodes", slug: "episodes", src: src2},
    {label: "crud", href: "/products", slug: "products", src: src3},

];

export const Header = observer(() => {
    const router = useRouter();

    const {showBurgerMenu, setShowBurgerMenu} = useStore();

    return (
        <header className={clsx({
            [style.header]: true,
            [style.header_showMenu]: showBurgerMenu,
        })}>
            <div className={style.inner}>
                <Link href="/">
                    <a className={style.logo}
                       onClick={() => {
                           setShowBurgerMenu(false)
                       }}
                    >
                        <div className={style.imageWrapper}>
                            <Image src={logo}
                                   layout="fill"
                                   objectFit="fill"
                                   width={300}
                                   height={300}
                                   alt="logo"
                            />
                        </div>
                        {svgIcons.swr}
                    </a>
                </Link>

                <IconButton size="small"
                            className={clsx({
                                [style.burgerBtn]: true,
                                [style.burgerBtn_showBurgerMenu]: showBurgerMenu,
                            })}
                            onClick={() => {
                                setShowBurgerMenu(!showBurgerMenu)
                            }}
                >
                    {showBurgerMenu ? <CloseIcon/> : <MenuIcon/>}
                </IconButton>

                <nav className={style.links}>
                    {
                        links.map(({label, href, slug}, index) => (
                            <Link key={index} href={href}>
                                <a className={clsx({
                                    [style.link]: true,
                                    [style.link_active]: router.pathname.includes(slug),
                                })}>
                                    {label}
                                </a>
                            </Link>
                        ))
                    }
                </nav>
            </div>
        </header>
    )
})