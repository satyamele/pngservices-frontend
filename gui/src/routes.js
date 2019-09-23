import React from 'react';
import { Route } from 'react-router-dom';
import CustomerList from './containers/CustomerListView';
import CustomLayout from './containers/Layout';


const BaseRouter = () =>(
    <div>
        <Route exact path='' components={CustomLayout}/>
        <Route exact path='/' components={CustomerList}/>
    </div>
);

export default BaseRouter;

