import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Main, Register, ComicDetail, Comics, Profile,
  FavoriteComics, CharacterDetail, Characters, FavoriteCharacters } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route exact path="/register" component={ Register } />
        <Route exact path="/main" component={ Main } />
        <Route exact path="/comic-detail" component={ ComicDetail } />
        <Route exact path="/comics" component={ Comics } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-comics" component={ FavoriteComics } />
        <Route exact path="/character-detail" component={ CharacterDetail } />
        <Route exact path="/characters" component={ Characters } />
        <Route exact path="/favorite-character" component={ FavoriteCharacters } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
