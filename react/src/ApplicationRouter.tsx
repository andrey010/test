import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { LoggedContext } from './logedContext'
import ROUTES from './routes'
import Landing from './views/Landing'
import Login from './views/Login'
import MainLanding from './views/MainLanding'

const ApplicationRouter = () => {

    const isLogged = useContext(LoggedContext)
    console.log(isLogged)
    return (
        <>
            {isLogged
                ?
                <Router>
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Landing} />
                </Switch>
                </Router>
                :
                <Router>
                <Switch>
                    <Route exact path={ROUTES.LOGIN} component={Login} />
                    <Route exact path={ROUTES.HOME} component={MainLanding} />
                </Switch>
                </Router >
            }
        </>
        
    )
}

export default ApplicationRouter
