import {NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import style from "./LocationItem.module.scss";
import React from "react";
import {InfoItem} from "../../Components/InfoItem/InfoItem";
import {NavigateBlock} from "../../Components/NavigateBlock/NavigateBlock";
import {useRouter} from "next/router";
import {ListOfResidents} from "../../Components/ListOfResidents/ListOfResidents";
import useSWRImmutable from "swr/immutable";
import {charactersAPI} from "../../api/character.api";
import {locationsAPI} from "../../api/location.api";

const LocationItem: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const {data: info, error: errorInfo} = useSWRImmutable(
        locationsAPI.getInfo.key,
        locationsAPI.getInfo.fetcher
    );

    const {data: location, error: errorLocation} = useSWRImmutable(
        locationsAPI.getById.key(id as string),
        locationsAPI.getById.fetcher
    );

    const {data: characters, error: errorCharactersOfLocation} = useSWRImmutable(
        charactersAPI.getMultipleItems.key((location && location.residents.length) ? location.residents : null),
        charactersAPI.getMultipleItems.fetcher
    );

    const loading = (!info && !errorInfo) || (!location && !errorLocation) || (!characters && !errorCharactersOfLocation)

    return (
        <MainLayout headTitle={`Rick and Morty | ${location?.name || "loading..."}`}>
            <div className={style.locationItem}>
                {
                    id && info &&
                    <NavigateBlock onPrevClick={() => router.push(`/location/${Number(id) - 1}`)}
                                   onNextClick={() => router.push(`/location/${Number(id) + 1}`)}
                                   prevDisabled={Number(id) <= 1}
                                   nextDisabled={Number(id) >= info.count}
                                   btnLabel="location"
                    />
                }
                {
                    location &&
                    <div className={style.content}>
                        <InfoItem label="Name" value={location.name}/>
                        {location.dimension && <InfoItem label="Dimension" value={location.dimension}/>}
                        {location.type && <InfoItem label="Type" value={location.type}/>}
                    </div>
                }

                {characters && <ListOfResidents residents={characters} label="location"/>}

            </div>

        </MainLayout>
    )
}
export default LocationItem
