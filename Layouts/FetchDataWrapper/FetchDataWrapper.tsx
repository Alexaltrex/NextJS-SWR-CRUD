import {FC, ReactNode} from "react";
import {ErrorBlock} from "../../Components/ErrorBlock/ErrorBlock";
import {LinearPreloader} from "../../Components/LinearPreloader/LinearPreloader";

interface IErrorWrapper {
    error: any
    loading: boolean
    children: ReactNode
}

export const FetchDataWrapper: FC<IErrorWrapper> = ({
                                                    error,
                                                    loading,
                                                    children
}) => {
    return (
        <div>

            {
                error
                    ? <ErrorBlock error={error}/>
                    : (
                        <>
                            {loading && <LinearPreloader/>}
                            {children}
                        </>
                    )
            }
        </div>

    )
}