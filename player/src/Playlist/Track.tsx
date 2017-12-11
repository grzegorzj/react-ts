import * as React from 'react';
import './Track.scss';
import {Artist} from '../ArtistCatalogue/Artist';

export interface Track {
    user: Artist;
}

export class Track extends React.Component<{}, object> {
    render () {
        return (
            <b>This is the list of artists</b>
        );
    }
}

