import * as React from 'react';
import './App.scss';
import { ArtistCatalogue } from './ArtistCatalogue';
import { Switch, Route } from 'react-router-dom';
import { Playlist } from './Playlist';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={ArtistCatalogue} />
                <Route path="/" component={Playlist} />
            </Switch>
        );
    }
}

export default App;
