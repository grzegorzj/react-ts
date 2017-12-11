import * as React from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router';
import * as queryString from 'querystring';
import { Artist } from './Artist';
import { Track } from '../Playlist/Track';
import * as _ from 'lodash';

const ENDPOINT_URL: string = 'https://api-v2.hearthis.at/feed/';
const TOP_ARTISTS_COUNT: number = 5;

interface FeedParams {
    type: string;
    count: number;
}

interface ArtistCatalogueState {
    artists: Artist[];
}

export class ArtistCatalogue extends React.Component<{} | RouteComponentProps<{}>, ArtistCatalogueState> {
    constructor (props: {}) {
        super(props);

        this.state = {
            artists: [],
        };
    }

    public componentDidMount (): void {
        const params: FeedParams = {
            type: 'popular',
            count: 20, // 5 is almost never enough to actually get 5 artists, this is a magic hax
        };

        fetch(`${ENDPOINT_URL}?${queryString.stringify(params)}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                const artists: Artist[] = data.map((track: Track) => track.user);
                const topArtists: Artist[] = _.uniqBy(artists, (artist: Artist) => artist.id)
                    .slice(0, TOP_ARTISTS_COUNT);

                this.setState({
                    artists: topArtists
                });
            });
    }

    public render (): JSX.Element {
        return (
            <div className="artist-catalogue">
                <h1 className="artist-catalogue__header">Top artists</h1>
                {this.artistsList}
            </div>
        );
    }

    private get artistsList (): JSX.Element {
        return (
                <ul className="artist-catalogue__artist-list">
                {
                    this.state.artists.map((artist: Artist) => (
                        <li className="artist-catalogue__artist-list">
                            <Artist artist={artist} />
                        </li>
                    ))
                }
                </ul>
        );
    }
}
