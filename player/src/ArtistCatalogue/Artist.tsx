import * as React from 'react';
import './Artist.scss';

export interface Artist {
    username: string;
    id: string;
    uri: string;
    avatar_url: string;
}

interface ArtistProps {
    artist: Artist;
}

export class Artist extends React.Component<ArtistProps, object> {
    constructor (props: ArtistProps) {
        super(props);
        console.log(props);
    }

    render () {
        return (
            <b>{ this.props.artist.username }</b>
        );
    }
}
