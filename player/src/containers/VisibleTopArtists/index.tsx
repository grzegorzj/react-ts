import {connect, Dispatch} from 'react-redux';
import { fetchTopArtists } from '../../actions/Artists';
import { ArtistCatalogue } from '../../components/ArtistCatalogue';
import { AppPlayerState } from '../../reducers';

// `connect` method + types, ugh

function mapStateToProps (state: any): any {
    return {
        artists: state.Artists
    }
}

function mapDispatchToProps (dispatch: Dispatch<AppPlayerState>): any {
    return {
        dispatchFetchArtists: (): void => {
            dispatch(fetchTopArtists(true));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArtistCatalogue);
