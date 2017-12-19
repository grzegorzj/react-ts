import * as React from 'react';
import './index.css';
import { Artist } from '../ArtistCatalogue/Artist'
import { default as PlayableTrack } from '../../containers/PlayableTrack';
import {Track, TrackComponent} from './Track';
import {Link} from "react-router-dom";


export interface VisiblePlaylist {
    artistPermalink: string;
    tracksMaxCount: number;
    tracklist: TrackComponent[];
    fetchedTracks: number;
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

    private fetching: boolean = false;

    public componentDidMount (): void {
        this.props.dispatchFetchArtist().then(() => {
            this.props.dispatchFetchTracklist();
        });

        window.document.addEventListener('scroll', this.handleScroll.bind(this));
    }

    public componentWillUnmount (): void {
        window.document.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    public render (): JSX.Element {
        return (
            <div className="playlist">
                <Link to="/" className="playlist__back">back</Link>
                <h1 className="playlist__header">{this.props.artist ? this.props.artist.username : ''}</h1>
                {this.trackList}
            </div>
        );
    }

    private handleScroll (): void {
        const offset: number = 100;
        if (!this.fetching && window.scrollY >= window.outerHeight - offset || this.height < window.outerHeight) {
            this.fetching = true;
            this.props.dispatchFetchTracklist().then(() => {
                this.fetching = false;
            });
        }
    }

    private get height (): number {
        const elem: Element = document.getElementsByClassName('playlist')[0];
        if (elem) {
            return elem.clientHeight;
        } else {
            return 0;
        }
    }

    private get trackList (): JSX.Element {
        return (
            <ul className="playlist__tracks-list">
                {
                    this.props.tracks.map((track: Track, i: number): JSX.Element => (
                        <PlayableTrack key={i} track={track} />
                    ))
                }
            </ul>
        );
    }
}
