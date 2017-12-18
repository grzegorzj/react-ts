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
    private player: HTMLAudioElement;

    constructor (props: PlayerProps) {
        super(props);
    }

    /* this is a bit wobbly too; considered using https://github.com/justinmc/react-audio-player,
    but has no Typings so took a shortcut */

    private play (): void {
        this.player.play();
        this.props.dispatchPlayTrack();
    }

    private pause (): void {
        this.player.pause();
        this.props.dispatchPauseTrack();
    }

    private stop (): void {
        this.player.pause();
        this.player.currentTime = 0;
        this.props.dispatchStopTrack();

    }

    private get audioPlayer (): JSX.Element {
        return (
            <audio ref={(player: HTMLAudioElement) => {this.player = player}} autoPlay src={this.props.track.stream_url}>
            </audio>
        )
    }

    private get playPauseToggleButton (): JSX.Element {
        return (
            <div>
                {!!this.props.track && this.props.state == 'playing' ? this.pauseButton : this.playButton}
            </div>
        )
    }

    private get pauseButton (): JSX.Element {
        return(
            <button className="audio-player__toggle--play" onClick={this.pause.bind(this)}>Pause</button>
        )
    }

    private get playButton (): JSX.Element {
        return(
            <button className="audio-player__toggle--play" onClick={this.play.bind(this)}>Play</button>
        )
    }

    private get stopButton (): JSX.Element {
        return (
            <button className="audio-player__stop" onClick={this.stop.bind(this)}>Stop</button>
        )
    }


    render () {
        return (
            <div>
                <b>{this.props.track ? this.props.track.title : '-'}</b>
                {this.props.track ? this.audioPlayer : ''}
                {this.props.track ? this.playPauseToggleButton : ''}
                {this.props.track ? this.stopButton : ''}
            </div>
        );
    }
}

