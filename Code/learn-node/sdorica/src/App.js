import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import asyncComponent from '@Utils/asyncComponent';
import { layoutContainer } from '@Components/LayoutContainer';

const RoleList = asyncComponent(() => import('@Pages/RoleList'));
const StrategyList = asyncComponent(() => import('@Pages/StrategyList'));

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/roleList" component={layoutContainer(RoleList)}/>
                    <Route path="/strategyList" component={layoutContainer(StrategyList)}/>
                </Switch>
            </Router>
        );
    }

}
  
export default App;