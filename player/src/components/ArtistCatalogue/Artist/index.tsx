import * as React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export interface Artist {
    username: string;
    id: string;
    uri: string;
    avatar_url: string;
    permalink: string;
    track_count?: string; // yep.
    thumb_url?: string;
}

interface ArtistProps {
    artist: Artist;
}

export class Artist extends React.Component<ArtistProps> {
    constructor (props: ArtistProps) {
        super(props);
    }


    render (): JSX.Element {
        return (
            <div className="artist">
                {
                    this.props.artist.thumb_url ?
                        <img className="artist__avatar" src={this.props.artist.thumb_url} /> :
                        null
                }
                <Link to={`/playlist/${this.props.artist.permalink}`}>
                    <b>{this.props.artist.username}</b>
                </Link>
                {
                    this.props.artist.track_count ?
                        <span className="artist__track-count">{this.props.artist.track_count} tracks</span> :
                        null
                }
            </div>
        );
    }
}
