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
    track: Track;
    dispatchSelectTrack (track: Track): void;
}

export class TrackComponent extends React.Component<TrackProps | any> {
    constructor (props: TrackProps) {
        super(props);
    }

    private selectTrack (): void {
        this.props.dispatchSelectTrack(this.props.track);
    }

    render () {
        return (
            <b onClick={this.selectTrack.bind(this)}>{this.props.track.title}</b>
        );
    }
}
