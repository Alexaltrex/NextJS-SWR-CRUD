import {NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import style from "./Character.module.scss";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {useRouter} from "next/router";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";
import {EpisodesOfCharacter} from "../../Components/EpisodesOfCharacter/EpisodesOfCharacter";
import Image from "next/image";
import useSWRImmutable from "swr/immutable";
import {charactersAPI} from "../../api/character.api";
import {getIdFromUrlLocation} from "../../helpers/helpers";
import {episodesAPI} from "../../api/episode.api";
import {LinearPreloader} from "../../Components/LinearPreloader/LinearPreloader";
import React from "react";

const CharacterItem: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const {data: info, error: errorInfo} = useSWRImmutable(
        charactersAPI.getInfo.key,
        charactersAPI.getInfo.fetcher
    );

    const {data: character, error: errorCharacter} = useSWRImmutable(
        charactersAPI.getById.key(id as string),
        charactersAPI.getById.fetcher
    );

    const {data: episodes, error: errorEpisodes} = useSWRImmutable(
        episodesAPI.getMultipleItems.key(character ? character.episode : null),
        episodesAPI.getMultipleItems.fetcher
    );

    const loading = (!info && !errorInfo) || (!character && !errorCharacter) || (!episodes && !errorEpisodes)
    console.log(loading)

    return (

        <MainLayout headTitle={`Rick and Morty | ${character?.name || "loading..."}`}>

            {loading && <LinearPreloader/>}

            <section className={style.character}>
                <div className={style.inner}>
                    {
                        info && id &&
                        <NavigateBlock onPrevClick={() => router.push(`/character/${Number(id) - 1}`)}
                                       onNextClick={() => router.push(`/character/${Number(id) + 1}`)}
                                       prevDisabled={loading || Number(id) <= 1}
                                       nextDisabled={loading || Number(id) >= info.count}
                                       btnLabel="character"
                        />
                    }

                    {
                        character &&
                        <div className={style.content}>
                            <div className={style.imageWrapper}>
                                <Image src={character.image}
                                       layout="fill"
                                       objectFit="fill"
                                       width={300}
                                       height={300}
                                       alt={character.name}
                                />
                            </div>

                            <div className={style.info}>
                                {
                                    [
                                        {label: "Name", value: character.name, href: undefined},
                                        {label: "Gender", value: character.gender, href: undefined},
                                        {label: "Species", value: character.species, href: undefined},
                                        {label: "Status", value: character.status, href: undefined},
                                        {label: "Type", value: character?.type, href: undefined},
                                        {
                                            label: "Location",
                                            value: character.location.name,
                                            href: character.location.url ? `/location/${getIdFromUrlLocation(character.location.url)}` : undefined
                                        },
                                        {
                                            label: "Origin",
                                            value: character.origin.name,
                                            href: character.origin.url ? `/location/${getIdFromUrlLocation(character.origin.url)}` : undefined
                                        },
                                    ]
                                        .map(({label, value, href}, index) => (
                                            <InfoItem key={index}
                                                      label={label}
                                                      value={value}
                                                      href={href}
                                            />
                                        ))
                                }
                                {
                                    episodes && Boolean(episodes.length) &&
                                    <EpisodesOfCharacter episodesOfCharacter={episodes}/>
                                }
                            </div>
                        </div>
                    }

                </div>
            </section>
        </MainLayout>

    )
}
export default CharacterItem