import * as React from 'react';
import './index.scss';
import { Artist } from '../../ArtistCatalogue/Artist';

export interface Track {
    user: Artist;
}

interface TrackProps {
    track: Track;
}

export class Track extends React.Component<TrackProps> {
    constructor (props: TrackProps) {
        super(props);
    }

    render () {
        return (
            <b>This is the list of artists</b>
        );
    }
}

