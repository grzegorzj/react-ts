import * as React from 'react';
import './index.scss';
import { PlaybackState } from '../../reducers';
import { Track } from '../Playlist/Track';

export interface PlayerProps {
    dispatchPlayTrack(): void;
    dispatchPauseTrack(): void;
    dispatchStopTrack(): void;
    track: Track;
    state: PlaybackState;
}

export class AudioPlayer extends React.Component<PlayerProps | any> { // hack, just for accelerating of investigation
    constructor (props: PlayerProps) {
        super(props);
    }

    private get audioPlayer (): JSX.Element {
        return (
            <audio autoPlay src={this.props.track.stream_url}>
            </audio>
        )
    }

    render () {
        return (
            <div>
                <b>{this.props.track ? this.props.track.title : '-'}</b>
                {this.props.track ? this.audioPlayer : ''}
            </div>
        );
    }
}

