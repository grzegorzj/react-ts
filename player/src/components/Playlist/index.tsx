import * as React from 'react';
import './index.scss';
import {Artist} from "../ArtistCatalogue/Artist";
import { Track } from './Track';

export interface VisiblePlaylist {
    artistPermalink: string;
    tracksMaxCount: number;
    tracklist: Track[];
}

interface PlaylistProps {
    dispatchFetchArtist(): Promise<Artist>;
    dispatchFetchTracklist(): Promise<Track[]>;
    artist: Artist;
}

export class Playlist extends React.Component<PlaylistProps> {
    constructor (props: PlaylistProps) {
        super(props);
    }

    public componentDidMount (): void {
        this.props.dispatchFetchArtist().then(() => {
            this.props.dispatchFetchTracklist();
        });
    }

    public render (): JSX.Element {
        return (
            <div className="playlist">
                <h1 className="playlist__header">{this.props.artist ? this.props.artist.username : ''}</h1>
            </div>
        );
    }

    private get artistsList (): JSX.Element {
        return (
            <ul className="playlist__tracks-list">

            </ul>
        );
    }
}
