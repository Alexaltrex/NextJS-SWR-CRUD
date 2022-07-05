import {FC} from "react";
import style from "./InfoItem.module.scss"
import clsx from "clsx";
import Link from "next/link";

interface IInfoItem {
    label: string
    value: string | undefined
    href?: string
}

export const InfoItem: FC<IInfoItem> = ({label, value, href}) => {
    if (!value) return null
    return (
        <div className={style.infoItem}>
            <p className={(style.label)}>{label}</p>

            <div/>

            {
                href ? (
                    <Link href={href}>
                        <a className={clsx({
                            [style.value]: true,
                            [style.value_name]: label === "Name",
                        })}>
                            {value}
                        </a>
                    </Link>

                ) : (
                    <p className={clsx({
                        [style.value]: true,
                        [style.value_name]: label === "Name",
                    })}>
                        {value}
                    </p>
                )
            }

        </div>
    )
}