import * as React from 'react';
import './index.scss';
import {Artist} from "../ArtistCatalogue/Artist";
// import { Track } from './Track';

// const ENDPOINT_URL: string = 'https://api-v2.hearthis.at/shawne/?type=likes&page=1&count=5';

interface PlaylistProps {
    dispatchFetchArtist(): void;
    artist: Artist;
}

export class Playlist extends React.Component<PlaylistProps> {
    constructor (props: PlaylistProps) {
        super(props);
    }

    public componentDidMount (): void {
        // fetch(`${ENDPOINT_URL}${this.props.match.params.permalink}/`)
        //     .then((response: any) => response.json())
        //     .then((data: any) => {
        //         console.log(data);
        //
        //         // this.setState({
        //         //     tracks: data
        //         // });
        //     });

        this.props.dispatchFetchArtist();
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
