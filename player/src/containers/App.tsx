import * as React from 'react';
import './App.scss';
import { ArtistCatalogue } from '../components/ArtistCatalogue';
import { Switch, Route } from 'react-router-dom';
import { Playlist } from '../components/Playlist';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={ArtistCatalogue} />
                <Route path="/playlist/:permalink" component={Playlist} />
            </Switch>
        );
    }
}

export default App;
