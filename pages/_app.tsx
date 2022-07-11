import '../assets/styles/globals.css'
import type {AppProps} from 'next/app'
import {useRouter} from "next/router";
import {createContext, useEffect, useState} from "react";
import {Preloader} from "../Components/Preloader/Preloader";
import {store, Store} from "../store/store";
import {SWRConfig} from "swr";

export const StoreContext = createContext<Store>({} as Store)

const  MyApp = ({Component, pageProps}: AppProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            //console.log("start");
            setLoading(true);
        }
        const handleStop = () => {
            //console.log("stop")
            setLoading(false);
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router]);

    return (
        <StoreContext.Provider value={store}>
            <SWRConfig value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            }}>
                <Component {...pageProps} />
                {loading && <Preloader/>}
            </SWRConfig>

        </StoreContext.Provider>
    )
}

export default MyApp
