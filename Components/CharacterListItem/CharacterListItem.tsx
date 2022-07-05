import React, {FC} from "react";
import style from "./CharacterListItem.module.scss";
import {ICharacter} from "../../types/characters.types";

interface ICharacterListItem {
    data: ICharacter
}

export const CharacterListItem: FC<ICharacterListItem> = ({data}) => {

    return (
        <div className={style.characterCard}>

            <div className={style.imgWrapper}>
                <img src={data.image} alt=""/>
            </div>

            <div className={style.properties}>
                <h2 className={style.title}>{`${data.id}. ${data.name}`}</h2>

                <div className={style.row}>
                    <p>Gender</p>
                    <p>{data.gender}</p>
                </div>

                {data.species && <div className={style.row}>
                    <p>Species</p>
                    <p>{data.species}</p>
                </div>}

                {
                    data.status &&
                    <div className={style.row}>
                        <p>Status</p>
                        <p>{data.status}</p>
                    </div>
                }

                {
                    data.type &&
                    <div className={style.row}>
                        <p>Type</p>
                        <p>{data.type}</p>
                    </div>
                }

                {
                    data.origin &&
                    <div className={style.row}>
                        <p>origin</p>
                        {
                            data.origin.url
                                ? (
                                    <button onClick={() => {
                                        //const id = data.origin.url.split("https://rickandmortyapi.com/api/location/")[1]
                                        //navigate(`/location/${id}`)
                                    }}
                                    >
                                        {data.origin.name}
                                    </button>
                                )
                                : <p>{data.origin.name}</p>
                        }
                    </div>
                }

                {
                    data.location &&
                    <div className={style.row}>
                        <p>Location</p>
                        {
                            data.location.url
                                ? (
                                    <button onClick={() => {
                                        //const id = data.location.url.split("https://rickandmortyapi.com/api/location/")[1];
                                        //navigate(`/location/${id}`);
                                    }}>
                                        {data.location.name}
                                    </button>
                                )
                                : <p>{data.location.name}</p>
                        }
                    </div>
                }
            </div>
        </div>
    )
}