import {FC} from "react";
import {IEpisode} from "../../types/episodes.api";
import style from "./EpisodesOfCharacter.module.scss"
import clsx from "clsx";
import Link from "next/link";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

interface IEpisodesOfCharacter {
    episodesOfCharacter: IEpisode[]
    className?: string
}

export const EpisodesOfCharacter: FC<IEpisodesOfCharacter> = ({
                                                                  episodesOfCharacter,
                                                                  className
}) => {
    return (
        <div className={clsx(style.episodesOfCharacter, className && className)}>
            <div className={style.info}>
                <p className={style.label}>List of episodes in which this character appeared:</p>
                <p className={style.count}>{episodesOfCharacter.length}</p>
            </div>

            <div className={style.episodes}>
                {
                    episodesOfCharacter.map(episode => (
                        <Link href={`/episode/${episode.id}`}
                              key={episode.id}
                        >
                            <a className={style.episodeChip}>
                                <div className={style.iconWrapper}>
                                    <LocalMoviesIcon className={style.icon}/>
                                </div>
                                <p>{`${episode.episode} - ${episode.name}`}</p>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}