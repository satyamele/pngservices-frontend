import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CustomerList from './containers/CustomerListView';
import { CustomerDetails } from "./containers/CustomerDetails";
import { Dashboard } from "./components/Dashboard";
import { AddClient } from "./components/AddClient";
import { UpdateClient } from "./components/UpdateTheClient";

const BaseRouter = () =>(
    <div>
       <Switch>
           <Route exact path='/' component={Dashboard}/>
           <Route exact path='/clientDeatils/:customerId' component={CustomerDetails}/>
           <Route exact path='/updateClient/:customerId' component={UpdateClient}/>
           <Route exact path='/addClients' component={AddClient}/>
           <Route exact path='/viewClients' component={CustomerList}/>
       </Switch>
    </div>
);

export default BaseRouter;

