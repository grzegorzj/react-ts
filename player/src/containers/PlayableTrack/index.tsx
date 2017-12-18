import {connect, Dispatch} from 'react-redux';
import { AppPlayerState } from '../../reducers';
import { Track, TrackComponent } from '../../components/Playlist/Track';
import { selectTrack } from '../../actions/Track';


function mapStateToProps (state: AppPlayerState, ownProps: {track: Track}): any {
    return {
        track: ownProps.track
    }
}

function mapDispatchToProps (dispatch: Dispatch<AppPlayerState>): any {
    return {
        dispatchSelectTrack: (trackId: string): void => {
            dispatch(selectTrack(trackId));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TrackComponent);