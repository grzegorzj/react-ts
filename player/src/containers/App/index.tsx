import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { default as VisibleTopArtists } from '../VisibleTopArtists';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={VisibleTopArtists} />
            </Switch>
        );
    }
}

export default App;

//{/*<Route path="/playlist/:permalink" component={Playlist} />*/}
