import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import { playerApp, PlayerState } from './reducers';
import { default as thunkMiddleware } from 'redux-thunk';

const store: Store<PlayerState | {}> = createStore(playerApp, {}, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
