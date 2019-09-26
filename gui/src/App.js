import React from 'react';
import { Router } from 'react-router-dom';
import BaseRouter from './routes';
import CustomLayout from '../src/containers/Layout';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css';

export const history = createBrowserHistory();


function App() {
  return (
    <div className="App">
        <Router history={history}>
            <CustomLayout>
                <BaseRouter />
            </CustomLayout>
        </Router>
    </div>
  );
}

export default App;
