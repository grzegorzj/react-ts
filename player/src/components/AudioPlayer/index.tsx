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

export class AudioPlayer extends React.Component<PlayerProps | any> {
    constructor (props: PlayerProps) {
        super(props);
    }

    render () {
        return (
            <b>{this.props.track ? this.props.track.title : 'nothing being played yet'}</b>
        );
    }
}

