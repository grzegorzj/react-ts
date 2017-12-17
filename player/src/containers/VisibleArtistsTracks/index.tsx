import {connect, Dispatch} from 'react-redux';
import { fetchArtistDetails } from '../../actions/Artists';
import { PlayerState } from '../../reducers';
import {Artist} from '../../components/ArtistCatalogue/Artist';
import { Playlist } from '../../components/Playlist';
import { fetchArtistTracklist } from '../../actions/Playlist';
import { Track } from "../../components/Playlist/Track";

// `connect` method + types, ugh again

function mapStateToProps (state: any, ownProps: any): any {
    return {
        artist: state
            .Artists
            .artists
            .find((existingArtist: Artist) => existingArtist.permalink === ownProps.match.params.permalink),
    }
}

function mapDispatchToProps (dispatch: Dispatch<PlayerState>, ownProps: any): any {
    return {
        dispatchFetchArtist: (): Promise<Artist> => {
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