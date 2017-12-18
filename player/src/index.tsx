import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import {playerApp, AppPlayerState, initialPlayerState} from './reducers';
import { default as thunkMiddleware } from 'redux-thunk';

const initialState: AppPlayerState = {
    Player: initialPlayerState,
    Artists: [],
    Playlists: [],
}
const store: Store<AppPlayerState> = createStore(playerApp, initialState, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
