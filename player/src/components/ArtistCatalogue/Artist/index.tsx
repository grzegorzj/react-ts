import * as React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export interface Artist {
    username: string;
    id: string;
    uri: string;
    avatar_url: string;
    permalink: string;
}

export interface ExtendedArtist extends Artist {
    track_count: string;
    thumb_url: string;
}

interface ArtistProps {
    artist: Artist;
}

interface ArtistState {
    extendedArtist: ExtendedArtist | null;
}

export class Artist extends React.Component<ArtistProps, ArtistState> {
    public state: ArtistState;

    constructor (props: ArtistProps) {
        super(props);

        this.state = {
            extendedArtist: null,
        }
    }

    public componentDidMount (): void {
        fetch(`${ENDPOINT_URL}${this.props.artist.permalink}/`)
            .then((response: any) => response.json())
            .then((data: ExtendedArtist) => {
                this.setState({
                    extendedArtist: data
                });
            });
    }

    render (): JSX.Element {
        return (
            <div className="artist">
                {
                    this.state.extendedArtist ?
                        <img className="artist__avatar" src={this.state.extendedArtist.thumb_url} /> :
                        null
                }
                <Link to={`/playlist/${this.props.artist.permalink}`}>
                    <b>{this.props.artist.username}</b>
                </Link>
                {
                    this.state.extendedArtist ?
                        <span className="artist__track-count">{this.state.extendedArtist.track_count} tracks</span> :
                        null
                }
            </div>
        );
    }
}
