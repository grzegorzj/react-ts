import { AnyAction } from 'redux';
import { Track } from '../components/Playlist/Track';

export const TRACK_SELECTED: string = 'TRACK_SELECTED';
export function selectTrack (track: Track): AnyAction {
    return {
        type: TRACK_SELECTED,
        track
    }
}

export const TRACK_PLAY: string = 'TRACK_PLAY';
export function playTrack (): AnyAction {
    return {
        type: TRACK_PLAY
    }
}

export const TRACK_PAUSE: string = 'TRACK_PAUSE';
export function pauseTrack (): AnyAction {
    return {
        type: TRACK_PAUSE
    }
}

export const TRACK_STOP: string = 'TRACK_STOP';
export function stopTrack (): AnyAction {
    return {
        type: TRACK_STOP
    }
}