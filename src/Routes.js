import React from 'react'
import { Switch, Route } from 'react-router'

import Home from './Home'
import CollectionsShowcase from './CollectionsShowcase' /*
import Collection from './Collection' */
import SingleMovie from './SingleMovie'


export default () =>
  <Switch>
    <Route exact path='/' component={Home} /> 
    <Route exact path='/collections' component={CollectionsShowcase} /> {/*
    <Route exact path='/collections/:collectionid' component={Collection} /> */}
    <Route exact path='/:movieid' component={SingleMovie} />
    <Route component={() => <p>Error 404, no hemos encontrado lo que buscas</p>} />
  </Switch>
