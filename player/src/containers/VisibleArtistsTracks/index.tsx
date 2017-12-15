import {connect, Dispatch} from 'react-redux';
import { fetchArtistDetails } from '../../actions/Artists';
import { PlayerState } from '../../reducers';
import {Artist} from '../../components/ArtistCatalogue/Artist';
import {Playlist} from '../../components/Playlist';

// `connect` method + types, ugh again

function mapStateToProps (state: any, ownProps: any): any {
    return {
        artist: state
            .Artists
            .artists
            .find((existingArtist: Artist) => existingArtist.permalink === ownProps.match.params.permalink),
    }
}

function mapDispatchToProps (dispatch: Dispatch<PlayerState>): any {
    return {
        dispatchFetchArtist: (permalink: string): void => {
            dispatch(fetchArtistDetails(permalink));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Playlist);