import {FC} from "react";
import style from "./CharacterCard.module.scss";
import {ICharacter} from "../../types/characters.types";
import Link from "next/link";
import Image from "next/image";

interface ICharacterCard {
    character: ICharacter
}

export const CharacterCard: FC<ICharacterCard> = ({character}) => {
    return (
        <Link href={`/character/${character.id}`}>
            <a className={style.characterCard}>
                <div className={style.imgWrapper}>
                    <Image src={character.image}
                           layout="fill"
                           objectFit="fill"
                           //width={300}
                           //height={300}
                           alt={character.name}
                    />
                </div>
                <p>{character.name}</p>
            </a>
        </Link>

    )
}