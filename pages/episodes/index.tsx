import {NextPage} from "next";
import style from "./Episodes.module.scss";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {TitleBlock} from "../../Components/Title/Title";
import Link from "next/link";
import useSWRImmutable from "swr/immutable";
import {episodesAPI} from "../../api/episode.api";
import React from "react";
import {FetchDataWrapper} from "../../Layouts/FetchDataWrapper/FetchDataWrapper";

const Episodes: NextPage = () => {
    const {data: episodes, error: error} = useSWRImmutable(
        episodesAPI.getAll.key,
        episodesAPI.getAll.fetcher
    );

    const loading = !episodes && !error

    return (
        <MainLayout headTitle="Rick and Morty | Episodes">
            <FetchDataWrapper error={error} loading={loading}>
                <section className={style.episodes}>
                    <TitleBlock title="episodes"/>
                    {
                        episodes &&
                        <div className={style.episodesList}>
                            {
                                episodes.map(episode => (
                                    <Link href={`/episode/${episode.id}`}
                                          key={episode.id}
                                    >
                                        <a className={style.episodesListItem}>
                                            {`${episode.episode} - ${episode.name}`}
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                    }
                </section>
            </FetchDataWrapper>
        </MainLayout>
    )
}
export default Episodes