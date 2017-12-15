import { AnyAction, combineReducers} from 'redux';
import { Artist } from '../components/ArtistCatalogue/Artist';
import { Playlist } from '../components/Playlist';
import { FETCHED_ARTIST_DETAILS, FETCHED_TOP_ARTISTS } from '../actions/Artists';

export interface PlayerState {
    artists: Artist[];
    playlists: Playlist[];
}

export const initialState: PlayerState = {
    artists: [],
    playlists: [],
}


function Artists (state: PlayerState = initialState, action: AnyAction): PlayerState {
    switch (action.type) {
        case FETCHED_TOP_ARTISTS:
            return Object.assign({}, state, {
                artists: action.topArtists
            });
        case FETCHED_ARTIST_DETAILS:
            const artistIndex: number = state.artists
                .findIndex((artist: Artist) => artist.permalink === action.artistDetails.permalink);
            const stateCopy: PlayerState = Object.assign({}, state);
            const artistsCopy: Artist[] = stateCopy.artists.splice(0);
            artistsCopy[artistIndex] = action.artistDetails;
            stateCopy.artists = artistsCopy;
            return stateCopy;
        default:
            return state;
    }
}

export const playerApp = combineReducers({Artists});
