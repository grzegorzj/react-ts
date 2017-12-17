import { AnyAction, combineReducers} from 'redux';
import { Artist } from '../components/ArtistCatalogue/Artist';
import { VisiblePlaylist} from '../components/Playlist';
import { FETCHED_ARTIST_DETAILS, FETCHED_TOP_ARTISTS } from '../actions/Artists';
import { FETCHED_TRACKLIST } from '../actions/Playlist';

export interface PlayerState {
    Artists: Artist[];
    Playlists: VisiblePlaylist[];
}


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
    switch (action.type) {
        case FETCHED_TRACKLIST:
            const playlistIndex: number = state.findIndex((playlist: VisiblePlaylist) =>
                playlist.artistPermalink === action.artistPermalink);

            const stateCopy: VisiblePlaylist[] = state.slice();
            const playlist: VisiblePlaylist = {
                artistPermalink: action.artistPermalink,
                tracklist: action.tracklist,
                tracksMaxCount: action.tracksMaxCount
            };

            if (playlistIndex > -1) {
                stateCopy[playlistIndex] = playlist;
            } else {
                stateCopy.push(playlist);
            }

            return stateCopy;
        default:
            return state;
    }
}

export const playerApp = combineReducers({Artists, Playlists});
