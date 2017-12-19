import { connect, Dispatch } from 'react-redux';
import { AppPlayerState } from '../../reducers';
import { pauseTrack, playTrack, stopTrack } from '../../actions/Track';
import { AudioPlayer } from '../../components/AudioPlayer';

function mapStateToProps (state: AppPlayerState): any {
    return {
        track: state.Player.track,
        state: state.Player.state,
    };
}

function mapDispatchToProps (dispatch: Dispatch<AppPlayerState>): any {
    return {
        dispatchPlayTrack: (): void => {
            dispatch(playTrack());
        },
        dispatchPauseTrack: (): void => {
            dispatch(pauseTrack());
        },
        dispatchStopTrack: (): void => {
            dispatch(stopTrack());
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AudioPlayer);