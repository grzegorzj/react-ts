import { combineReducers } from 'redux';
import { Artist } from '../components/ArtistCatalogue/Artist';
import {Playlist} from "../components/Playlist";

export interface PlayerState {
    artists: Artist[];
    playlists: Playlist[];
}

export const playerApp = combineReducers({});