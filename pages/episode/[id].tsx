import {NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import React from "react";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";
import {useRouter} from "next/router";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {ListOfResidents} from "../../Components/ListOfResidents/ListOfResidents";
import style from "./EpisodeItem.module.scss";
import useSWRImmutable from "swr/immutable";
import {episodesAPI} from "../../api/episode.api";
import {charactersAPI} from "../../api/character.api";
import {LinearPreloader} from "../../Components/LinearPreloader/LinearPreloader";


const EpisodeItem: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const {data: info, error: errorInfo} = useSWRImmutable(
        episodesAPI.getInfo.key,
        episodesAPI.getInfo.fetcher
    );

    const {data: episode, error: errorEpisode} = useSWRImmutable(
        episodesAPI.getById.key(id as string),
        episodesAPI.getById.fetcher
    );

    const {data: charactersOfEpisode, error: errorCharactersOfEpisode} = useSWRImmutable(
        charactersAPI.getMultipleItems.key((episode && episode.characters.length) ? episode.characters : null),
        charactersAPI.getMultipleItems.fetcher
    );

    const loading = (!info && errorInfo) || (!episode && !errorEpisode) && (!charactersOfEpisode && !errorCharactersOfEpisode)

    return (
        <MainLayout headTitle={`Rick and Morty | ${episode?.episode || "loading..."} - ${episode?.name}`}>

            {loading && <LinearPreloader/>}

            <div className={style.episodeItem}>

                {
                    id && info &&
                    <NavigateBlock onPrevClick={() => router.push(`/episode/${Number(id) - 1}`)}
                                   onNextClick={() => router.push(`/episode/${Number(id) + 1}`)}
                                   prevDisabled={Number(id) <= 1}
                                   nextDisabled={Number(id) >= info.count}
                                   btnLabel="episode"
                    />
                }

                {
                    episode &&
                    <div className={style.content}>
                        <InfoItem label="name" value={episode.name}/>
                        <InfoItem label="episode" value={episode.episode}/>
                        <InfoItem label="air date" value={episode.air_date}/>
                    </div>
                }

                {
                    charactersOfEpisode &&
                    <ListOfResidents residents={charactersOfEpisode} label="episode"/>
                }

            </div>
        </MainLayout>
    )
}
export default EpisodeItem