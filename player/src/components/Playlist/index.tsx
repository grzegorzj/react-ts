import * as React from 'react';
import './index.scss';
import { Artist } from '../ArtistCatalogue/Artist'
import { default as PlayableTrack } from '../../containers/PlayableTrack';
import {Track, TrackComponent} from './Track';


export interface VisiblePlaylist {
    artistPermalink: string;
    tracksMaxCount: number;
    tracklist: TrackComponent[];
}

interface PlaylistProps {
    dispatchFetchArtist(): Promise<Artist>;
    dispatchFetchTracklist(): Promise<Track[]>;
    artist: Artist;
    tracks: Track[];
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
                {this.trackList}
            </div>
        );
    }

    private get trackList (): JSX.Element {
        return (
            <ul className="playlist__tracks-list">
                {
                    this.props.tracks.map((track: Track, i: number): JSX.Element => (
                        <li key={i} className="playlist__artist">
                            <PlayableTrack track={track} />
                        </li>
                    ))
                }
            </ul>
        );
    }
}
