import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { default as VisibleTopArtists } from '../VisibleTopArtists';
import { default as VisibleArtistsTracks } from '../VisibleArtistsTracks';
import { default as Player } from '../Player';

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact={true} path="/" component={VisibleTopArtists} />
                    <Route path="/playlist/:permalink" component={VisibleArtistsTracks} />
                </Switch>
                <Player />
            </div>
        );
    }
}

export default App;
