import React from 'react'
import './App.css'
import { generateRoutes, browserHistory } from '../router/Routes'
import { Router } from 'react-router'

const App: React.FC = () => {
    return <Router history={browserHistory}>{generateRoutes()}</Router>
}

export default App
