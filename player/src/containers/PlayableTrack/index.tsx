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
        dispatchSelectTrack: (track: Track): void => {
            dispatch(selectTrack(track));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TrackComponent);