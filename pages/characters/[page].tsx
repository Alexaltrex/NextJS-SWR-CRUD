import {NextPage} from "next";
import style from "./Characters.module.scss";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import Pagination from '@mui/material/Pagination';
import {TitleBlock} from "../../Components/Title/Title";
import {CharacterCard} from "../../Components/CharacterCard/CharacterCard";
import {useRouter} from "next/router";
import useSWRImmutable from 'swr/immutable'
import {charactersAPI} from "../../api/character.api";
import React from "react";
import {FetchDataWrapper} from "../../Layouts/FetchDataWrapper/FetchDataWrapper";

const Characters: NextPage = () => {
    const router = useRouter();
    const {page} = router.query;

    const {data: info, error: errorInfo} = useSWRImmutable(
        charactersAPI.getInfo.key,
        charactersAPI.getInfo.fetcher
    );
    const {data: characters, error: errorCharacters} = useSWRImmutable(
        charactersAPI.getAll.key(page as string),
        charactersAPI.getAll.fetcher
    );

    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        router.push(`/characters/${page}`)
    }

    const loading = (!info && !errorInfo) || (!characters && !errorCharacters)
    const error = errorInfo
        ? errorInfo
        : errorCharacters
            ? errorCharacters
            : null

    return (
        <MainLayout headTitle="Rick and Morty | Characters">
            <FetchDataWrapper error={error} loading={loading}>
                <section className={style.characters}>
                    <div className={style.inner}>
                        <TitleBlock title="characters"/>
                        {
                            info && page &&
                            <Pagination variant="outlined"
                                        size="small"
                                        shape="rounded"
                                        count={info.pages}
                                        page={Number(page)}
                                        showFirstButton
                                        showLastButton
                                        onChange={onChangeHandler}
                                        sx={paginationSx}
                                        disabled={loading}
                            />
                        }
                        {
                            characters &&
                            <div className={style.cards}>
                                {
                                    characters.map(character => (
                                            <CharacterCard key={character.id}
                                                           character={character}
                                            />
                                        )
                                    )
                                }
                            </div>
                        }
                    </div>
                </section>
            </FetchDataWrapper>
        </MainLayout>
    )
}
export default Characters

const paginationSx = {
    marginTop: "10px",
    alignSelf: "center",
    "& .Mui-selected": {
        backgroundColor: "rgba(0, 0, 0, 0.3)!important"
    }
}

