import { connect, Dispatch } from 'react-redux';
import { fetchArtistDetails } from '../../actions/Artists';
import { AppPlayerState } from '../../reducers';
import {Artist} from '../../components/ArtistCatalogue/Artist';
import { Playlist, VisiblePlaylist } from '../../components/Playlist';
import { fetchArtistTracklist } from '../../actions/Playlist';
import { Track } from '../../components/Playlist/Track';

// `connect` method + types, ugh again

function mapStateToProps (state: any, ownProps: any): any {
    const playlist = state
        .Playlists
        .find((existingPlaylist: VisiblePlaylist) =>
            existingPlaylist.artistPermalink === ownProps.match.params.permalink);

    const tracks: Track[] = playlist && playlist.tracklist ? playlist.tracklist : [];

    return {
        artist: state
            .Artists
            .find((existingArtist: Artist) => existingArtist.permalink === ownProps.match.params.permalink),
        tracks: tracks,
    }
}

function mapDispatchToProps (dispatch: Dispatch<AppPlayerState>, ownProps: any): any {
    return {
        dispatchFetchArtist: (): Promise<Artist | undefined> => {
            return dispatch(fetchArtistDetails(ownProps.match.params.permalink));
        },
        dispatchFetchTracklist: (): Promise<Track[] | undefined> => {
            return dispatch(fetchArtistTracklist(ownProps.match.params.permalink));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Playlist);