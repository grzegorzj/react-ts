import * as React from 'react';
import './index.scss';
import { Artist } from './Artist';

export interface ArtistCatalogueProps {
    artists: Artist[];
    dispatchFetchArtists(): void;
}

export class ArtistCatalogue extends React.Component<ArtistCatalogueProps> {
    constructor (props: ArtistCatalogueProps) {
        super(props);
    }

    public componentDidMount (): void {
        this.props.dispatchFetchArtists();
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
                    this.props.artists.map((artist: Artist, i: number): JSX.Element => (
                        <li key={i} className="artist-catalogue__artist-list">
                            <Artist artist={artist} />
                        </li>
                    ))
                }
                </ul>
        );
    }
}
