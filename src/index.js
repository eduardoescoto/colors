import '../node_modules/antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './Store/store';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

const colors = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <App />
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(colors, document.getElementById('root'));
registerServiceWorker();

/**
 * TODO: 
 * [x] Create Sider
 * [x] Create Color Sliders and make them look nice
 * [x] Create Breadcrumbs that integrate with router
 * [x] Make footer fixed and text centered all the time
 * [x] Create Settings Pages for each type
 * [x] Fix settings titles to look nice
 * [x] Fix all settings page to maybe use dropdowns
 * [x] Change Radio group to check box group
 * [x] add list of named colors
 * [x] Move header breadcrumbs to their own component
 * [x] Set the current settings type
 * [x] Fix sider animation
 * [] Refactor Sliders and Accordions. The code and props could be much more eloquent. Maybe use recursive solution to render accordion
 * [] add color range boxes to the check box group within consideration for the color type
 * [] Write the Colors page
 * [] Create Palette Creator
 * [] Find a way to programmatically pick good companion colors
 * [] Change Manifest and Icon for production use
 * [] Incorporate accounts to keep palettes saved
 * [] Save palettes for offline use in different formats like txt, json
 * [] Copy a color hex or rgb value to clipboard
 * [] Get domain and market!
 */