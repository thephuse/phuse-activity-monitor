import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { fetchTimes } from './actions'
import configureStore from './store'
import AppContainer from './containers/AppContainer'

const store = configureStore()
const documentRoot = document.getElementById('app')

render((
  <Provider store={store}>
    <AppContainer />
  </Provider>
), documentRoot);
