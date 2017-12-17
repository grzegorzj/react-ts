import { AnyAction, combineReducers} from 'redux';
import { Artist } from '../components/ArtistCatalogue/Artist';
import { VisiblePlaylist } from '../components/Playlist';
import { FETCHED_ARTIST_DETAILS, FETCHED_TOP_ARTISTS } from '../actions/Artists';
import { FETCHED_TRACKLIST } from '../actions/Playlist';

export interface PlayerState {
    artists: Artist[];
    playlists: VisiblePlaylist[];
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

            if (artistIndex > -1) {
                artistsCopy[artistIndex] = action.artistDetails;
            } else {
                artistsCopy.push(action.artistDetails);
            }

            stateCopy.artists = artistsCopy;
            return stateCopy;
        default:
            return state;
    }
}

function Playlists (state: PlayerState = initialState, action: AnyAction): PlayerState {
    switch (action.type) {
        case FETCHED_TRACKLIST:
            const playlistIndex: number = state.playlists.findIndex((playlist: VisiblePlaylist) =>
                playlist.artistPermalink === action.artistPermalink);

            const stateCopy: PlayerState = Object.assign({}, state);
            const playlistsCopy: VisiblePlaylist[] = stateCopy.playlists.splice(0);
            const playlist: VisiblePlaylist = {
                artistPermalink: action.artistPermalink,
                tracklist: action.tracklist,
                tracksMaxCount: action.tracksMaxCount
            };

            if (playlistIndex > -1) {
                playlistsCopy[playlistIndex] = playlist;
            } else {
                playlistsCopy.push(playlist);
            }

            stateCopy.playlists = playlistsCopy;
            return stateCopy;
        default:
            return state;
    }
}

export const playerApp = combineReducers({Artists, Playlists});
