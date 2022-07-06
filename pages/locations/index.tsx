import {NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import style from "./Locations.module.scss";
import {LocationsTable} from "../../Components/LocationsTable/LocationsTable";
import {TitleBlock} from "../../Components/Title/Title";
import useSWRImmutable from "swr/immutable";
import {locationsAPI} from "../../api/location.api";
import React from "react";
import {FetchDataWrapper} from "../../Layouts/FetchDataWrapper/FetchDataWrapper";

const Locations: NextPage = () => {
    const {data: locations, error: error} = useSWRImmutable(
        locationsAPI.getAll.key,
        locationsAPI.getAll.fetcher
    );

    const loading = !locations && !error;

    return (
        <MainLayout headTitle="Rick and Morty | Locations">
            <FetchDataWrapper error={error} loading={loading}>
                <section className={style.locations}>
                    <TitleBlock title="locations"/>
                    {locations && <LocationsTable locations={locations}/>}
                </section>
            </FetchDataWrapper>
        </MainLayout>
    )
}
export default Locations;

