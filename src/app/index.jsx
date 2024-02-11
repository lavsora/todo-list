import React from 'react'

import Main from '../pages/main'

import RouteProvider from './provider/route'


const App = () => (
  <RouteProvider>
    <Main />
  </RouteProvider>
)

export default App
