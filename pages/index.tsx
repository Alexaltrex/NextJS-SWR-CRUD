import type {NextPage} from 'next'
import {MainLayout} from "../Layouts/MainLayout/MainLayout";
import style from "./index.module.scss";
import Image from 'next/image';
import {links} from "../Components/Header/Header";
import Link from "next/link";
import {observer} from "mobx-react-lite";

const HomePage: NextPage = observer(() => {
    return (
        <MainLayout>
            <div className={style.index}>
                {
                    links.map(({label, href, src}, index) => (
                        <Link href={href}
                              key={index}
                        >
                            <a className={style.link}>
                                <div className={style.imageWrapper}>
                                    <Image src={src}
                                           layout="fill"
                                           objectFit="fill"
                                           width={400}
                                           height={400}
                                           alt={label}
                                    />
                                </div>
                                <p>{label}</p>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </MainLayout>
    )
})

export default HomePage
