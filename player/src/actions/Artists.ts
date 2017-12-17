import { ThunkAction } from 'redux-thunk';
import { PlayerState } from '../reducers';
import { Dispatch } from 'react-redux';
import * as queryString from 'querystring';
import { Artist } from '../components/ArtistCatalogue/Artist';
import { Track } from '../components/Playlist/Track';
import * as _ from 'lodash';

export const FETCHED_TOP_ARTISTS: string = 'FETCHED_TOP_ARTISTS';
function fetchedTopArtists (topArtists: Artist[]): any {
    return {
        type: FETCHED_TOP_ARTISTS,
        topArtists
    }
}

export const FETCHED_ARTIST_DETAILS: string = 'FETCHED_ARTIST_DETAILS';
function fetchedArtistDetails (artistDetails: Artist): any {
    return {
        type: FETCHED_ARTIST_DETAILS,
        artistDetails
    }
}


export function fetchArtistDetails (permalink: string): ThunkAction<Promise<Artist | undefined>, PlayerState, null> {
    const ENDPOINT_URL: string = 'https://api-v2.hearthis.at/';

    return (dispatch: Dispatch<PlayerState>, getState: () => PlayerState): Promise<Artist | undefined> => {
        const artistFetched: boolean = !!getState().Artists.find((artist: Artist) => artist.permalink === permalink &&
        !!artist.track_count);

        if (artistFetched) {
            return <Promise<undefined>>Promise.resolve(undefined);
        }

        return fetch(`${ENDPOINT_URL}${permalink}/`)
            .then((response: any) => response.json())
            .then((artistDetails: Artist) => {
                dispatch(fetchedArtistDetails(artistDetails));
                return artistDetails;
            });
    }
}

export function fetchTopArtists (fetchDetails: boolean = false): ThunkAction<Promise<Artist[]>, PlayerState, null> {
    interface FetchTopArtistsFeedParams {
        type: string;
        count: number;
    }

    const ENDPOINT_URL: string = 'https://api-v2.hearthis.at/feed/';
    const TOP_ARTISTS_COUNT: number = 5;

    return (dispatch: Dispatch<PlayerState>, getState: () => PlayerState): Promise<Artist[]> => {
        if (getState().Artists && getState().Artists.length === TOP_ARTISTS_COUNT) {
            return Promise.resolve([]);
        }

        const params: FetchTopArtistsFeedParams = {
            type: 'popular',
            count: 20, // 5 is almost never enough to actually get 5 artists, this is a magic hax
        };

        return fetch(`${ENDPOINT_URL}?${queryString.stringify(params)}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                const artists: Artist[] = data.map((track: Track) => track.user);
                const topArtists: Artist[] = _.uniqBy(artists, (artist: Artist) => artist.id)
                    .slice(0, TOP_ARTISTS_COUNT);
                dispatch(fetchedTopArtists(topArtists));

                return topArtists;
            }).then((topArtists: Artist[]) => {
                if (fetchDetails) {
                    topArtists.forEach((artist: Artist) => dispatch(fetchArtistDetails(artist.permalink)))
                }

                return topArtists;
            });
    }
}