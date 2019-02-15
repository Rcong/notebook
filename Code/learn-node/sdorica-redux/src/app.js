import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import asyncComponent from '@Utils/asyncComponent';
import { layoutContainer } from '@Components/LayoutContainer';

const RoleList = asyncComponent(() => import('@Pages/RoleList'));
// const RoleDetail = asyncComponent(() => import('@Pages/RoleDetail'));
// const StrategyList = asyncComponent(() => import('@Pages/StrategyList'));

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={layoutContainer(RoleList)}/>
     
                </Switch>
            </Router>
        );
    }

}
// <Route path="/roleDetail/:roleId" component={layoutContainer(RoleDetail)}/>
// <Route path="/strategyList" component={layoutContainer(StrategyList)}/>
export default App;