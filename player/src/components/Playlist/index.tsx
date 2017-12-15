import * as React from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router';
// import { Artist } from '../ArtistCatalogue/Artist';
import { Track } from './Track';

const ENDPOINT_URL: string = 'https://api-v2.hearthis.at/shawne/?type=likes&page=1&count=5';

interface PlaylistState {
    tracks: Track[];
}

interface PlaylistProps {
    permalink: string;
}

export class Playlist extends React.Component<RouteComponentProps<PlaylistProps>, PlaylistState> {
    public state: PlaylistState;

    constructor (props: RouteComponentProps<PlaylistProps>) {
        super(props);

        this.state = {
            tracks: [],
        };
    }

    public componentDidMount (): void {
        fetch(`${ENDPOINT_URL}${this.props.match.params.permalink}/`)
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data);

                // this.setState({
                //     tracks: data
                // });
            });
    }

    public render (): JSX.Element {
        return (
            <div className="playlist">
                <h1 className="playlist__header">Top artists</h1>
                {this.artistsList}
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
