import * as React from 'react';
import './index.scss';
import { Artist } from '../../ArtistCatalogue/Artist';

export interface Track {
    user: Artist;
    id: string;
    title: string;
}

interface TrackProps {
    track: Track;
}

export class TrackComponent extends React.Component<TrackProps> {
    constructor (props: TrackProps) {
        super(props);
    }

    render () {
        return (
            <b>{this.props.track.title}</b>
        );
    }
}
