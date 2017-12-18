import { AnyAction } from 'redux';

export const TRACK_SELECTED: string = 'TRACK_SELECTED';
export function selectTrack (trackId: string): AnyAction {
    return {
        type: TRACK_SELECTED,
        trackId
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