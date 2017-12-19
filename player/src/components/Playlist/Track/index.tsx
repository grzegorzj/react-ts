import * as React from 'react';
import './index.scss';
import { Artist } from '../../ArtistCatalogue/Artist';

export interface Track {
    user: Artist;
    id: string;
    title: string;
    stream_url: string;
}

interface TrackProps {
    dispatchSelectTrack (track: Track): void;
    track: Track;
}

export class TrackComponent extends React.Component<TrackProps | any> {
    constructor (props: TrackProps) {
        super(props);
    }

    public render () {
        return (
            <li className="track">
                <strong onClick={this.selectTrack.bind(this)}>{this.props.track.title}</strong>
            </li>
        );
    }

    private selectTrack (): void {
        this.props.dispatchSelectTrack(this.props.track);
    }
}
