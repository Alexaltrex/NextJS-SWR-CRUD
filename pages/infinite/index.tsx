import {NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {TitleBlock} from "../../Components/Title/Title";
import style from "./infinite.module.scss";
import useSWRInfinite from "swr/infinite";
import {Button} from "@mui/material";
import {CharacterListItem} from "../../Components/CharacterListItem/CharacterListItem";
import {charactersAPI} from "../../api/character.api";
import {LinearPreloader} from "../../Components/LinearPreloader/LinearPreloader";
import React from "react";

const InfiniteWithButton: NextPage = () => {
    const {data, error, size, setSize} = useSWRInfinite(
        charactersAPI.getInfinite.key,
        charactersAPI.getInfinite.fetcher
    );

    const loading = !data && !error

    return (
        <MainLayout headTitle="Rick and Morty | Characters list">

            {loading && <LinearPreloader/>}

            <section className={style.infinite}>
                <TitleBlock title="characters list"/>

                {
                    data &&
                    <div>
                        {
                            data.map((block, index) => (
                                <div key={index}>
                                    {
                                        block.map(character => <CharacterListItem key={character.id} data={character}/>)
                                    }
                                </div>
                            ))
                        }
                    </div>
                }

                <Button variant="contained"
                        size="small"
                        onClick={() => setSize(size + 1)}
                        className={style.btn}
                >
                    Show more...
                </Button>

            </section>

        </MainLayout>
    )
}
export default InfiniteWithButton