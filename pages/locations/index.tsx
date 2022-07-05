import {NextPage} from "next";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import style from "./Locations.module.scss";
import {LocationsTable} from "../../Components/LocationsTable/LocationsTable";
import {TitleBlock} from "../../Components/Title/Title";
import useSWRImmutable from "swr/immutable";
import {locationsAPI} from "../../api/location.api";
import {LinearPreloader} from "../../Components/LinearPreloader/LinearPreloader";
import React from "react";

const Locations: NextPage = () => {
    const {data: locations, error: error} = useSWRImmutable(
        locationsAPI.getAll.key,
        locationsAPI.getAll.fetcher
    );

    return (
        <MainLayout headTitle="Rick and Morty | Locations">

            {(!locations && !error) && <LinearPreloader/>}

            <section className={style.locations}>
                <TitleBlock title="locations"/>
                {locations && <LocationsTable locations={locations}/>}
            </section>
        </MainLayout>
    )
}
export default Locations;

