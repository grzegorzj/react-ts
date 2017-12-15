import * as React from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router';
import { Artist } from './Artist';

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
