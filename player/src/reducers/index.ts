import {Action, combineReducers} from 'redux';
import { Artist } from '../components/ArtistCatalogue/Artist';
import {Playlist} from "../components/Playlist";

export interface PlayerState {
    artists: Artist[];
    playlists: Playlist[];
}

export const initialState: PlayerState = {
    artists: [],
    playlists: [],
}

function defaultReducer (state: PlayerState, action: Action): PlayerState {
    return initialState;
}

export const playerApp = combineReducers({defaultReducer});