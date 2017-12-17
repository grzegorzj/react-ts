import { ThunkAction } from 'redux-thunk';
import { PlayerState } from '../reducers';
import { Dispatch } from 'react-redux';
import * as queryString from 'querystring';
import { Track } from '../components/Playlist/Track';
import { VisiblePlaylist } from '../components/Playlist';
import { Artist } from '../components/ArtistCatalogue/Artist';
import {fetchArtistDetails} from "./Artists";

export const FETCHED_TRACKLIST: string = 'FETCHED_TRACKLIST';
function fetchedTracklist (tracklist: Track[], artistPermalink: string, tracksMaxCount: number): any {
    return {
        type: FETCHED_TRACKLIST,
        tracklist,
        artistPermalink,
        tracksMaxCount,
    }
}


// always get next 20

/*
Not sure if I missed something, but it seems like foreign key between artists and playlists is the `permalink`.
 */
export function fetchArtistTracklist (artistPermalink: string): ThunkAction<Promise<Track[] | undefined>, PlayerState, null> {
    interface fetchArtistTracklistParams {
        type: string;
        page: number;
        count: number;
    }

    const ENDPOINT_URL: string = 'https://api-v2.hearthis.at/';
    const PAGE_SIZE: number = 20;

    return (dispatch: Dispatch<PlayerState>, getState: () => PlayerState): Promise<Track[] | undefined> => {
        const playlistInState: VisiblePlaylist | undefined = getState().playlists.find((playlist: VisiblePlaylist): boolean => {
           return playlist.artistPermalink === artistPermalink;
        });

        const fetchedTracks: number = playlistInState ? playlistInState.tracklist.length : 0;

        const params: fetchArtistTracklistParams = {
            type: 'tracks',
            page: fetchedTracks ? Math.floor(fetchedTracks/PAGE_SIZE) + 1 : 1,
            count: PAGE_SIZE
        };

        const artist: Artist | undefined = getState()
            .artists
            .find((artist: Artist) => artist.permalink === artistPermalink);

        let tracksMaxCount: number;

        if (artist && artist.track_count) { // wobbly data relations here tbh, mea culpa
            tracksMaxCount = +artist.track_count;
        } else {
            dispatch(fetchArtistThenTracklist(artistPermalink));
            return Promise.resolve(undefined);
        }

        return fetch(`${ENDPOINT_URL}/${artistPermalink}?${queryString.stringify(params)}`)
            .then((response: any) => response.json())
            .then((tracks: Track[]) => {
                dispatch(fetchedTracklist(tracks, artistPermalink, tracksMaxCount));
                return tracks;
            });
    }
}

/*
I think this sort of actions deserve a Darwin Award, but eh. The whole thing is a workaround for inconveniently designed
API that paginates, but doesn't return the present context (e.g. how many results/pages should I expect), so I have to
fetch another entity to know. Otherwise these two guys would have nothing to do w/ each other, and the component would
decide which actions to dispatch and when (it already would work that way, but I wanted to emphasize that it's the
action, not the component, that should care of making valid API requests).
 */
export function fetchArtistThenTracklist (artistPermalink: string): ThunkAction<void, PlayerState, null> {
    return (dispatch: Dispatch<PlayerState>, getState: () => PlayerState): void => {
        dispatch(fetchArtistDetails(artistPermalink)).then((artist: Artist) => {
            if (artist && artist.track_count) {
                dispatch(fetchArtistTracklist(artistPermalink));
            } else {
                throw new Error('Artist missing track count.');
            }
        });
    }
}
