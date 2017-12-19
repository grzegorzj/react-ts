import {AnyAction, combineReducers, Reducer} from 'redux';
import { Artist } from '../components/ArtistCatalogue/Artist';
import { VisiblePlaylist} from '../components/Playlist';
import { FETCHED_ARTIST_DETAILS, FETCHED_TOP_ARTISTS } from '../actions/Artists';
import {FETCHED_TRACKLIST, WILL_FETCH_TRACKLIST} from '../actions/Playlist';
import { Track } from '../components/Playlist/Track';
import {TRACK_PAUSE, TRACK_PLAY, TRACK_SELECTED, TRACK_STOP} from "../actions/Track";

export interface AppPlayerState {
    Artists: Artist[];
    Playlists: VisiblePlaylist[];
    Player: PlayerState;
}

export type PlaybackState = 'playing' | 'paused' | 'stopped';

export interface PlayerState {
    track: Track | undefined;
    state: PlaybackState;
}

export const initialPlayerState: PlayerState = {
    state: 'stopped',
    track: undefined
};


function Artists (state: Artist[] = [], action: AnyAction): Artist[] {
    switch (action.type) {
        case FETCHED_TOP_ARTISTS:
            return action.topArtists.slice();
        case FETCHED_ARTIST_DETAILS:
            const artistIndex: number = state
                .findIndex((artist: Artist) => artist.permalink === action.artistDetails.permalink);

            const stateCopy: Artist[] = state.slice();

            if (artistIndex > -1) {
                stateCopy[artistIndex] = action.artistDetails;
            } else {
                stateCopy.push(action.artistDetails);
            }

            return stateCopy;
        default:
            return state;
    }
}

function Playlists (state: VisiblePlaylist[] = [], action: AnyAction): VisiblePlaylist[] {
    const playlistIndex: number = state.findIndex((playlist: VisiblePlaylist) =>
        playlist.artistPermalink === action.artistPermalink);

    const stateCopy: VisiblePlaylist[] = state.slice();

    switch (action.type) {
        case FETCHED_TRACKLIST:
            if (!action.tracklist) {
                return state;
            }
            const playlist: VisiblePlaylist = {
                artistPermalink: action.artistPermalink,
                tracklist: playlistIndex > -1 ?
                    state[playlistIndex].tracklist.concat(action.tracklist) :
                    action.tracklist,
                tracksMaxCount: action.tracksMaxCount,
                fetchedTracks: playlistIndex > -1 ?
                    state[playlistIndex].fetchedTracks :
                    action.tracklist.length,
            };

            if (playlistIndex > -1) {
                stateCopy[playlistIndex] = playlist;
            } else {
                stateCopy.push(playlist);
            }

            return stateCopy;
        case WILL_FETCH_TRACKLIST:
            if (playlistIndex > -1) {
                stateCopy[playlistIndex].fetchedTracks += action.size;
             }
            return stateCopy;
        default:
            return state;
    }
}

function Player (state: PlayerState = initialPlayerState, action: AnyAction): PlayerState {
    switch (action.type) {
        case TRACK_SELECTED:
            return {
                state: 'playing',
                track: action.track
            };

        case TRACK_PLAY:
            return {
                state: 'playing',
                track: state.track
            };

        case TRACK_PAUSE:
            return {
                state: 'paused',
                track: state.track
            };

        case TRACK_STOP:
            return {
                state: 'stopped',
                track: state.track
            };

        default:
            return state;
    }
}

export const playerApp: Reducer<AppPlayerState> = combineReducers({Artists, Playlists, Player});
