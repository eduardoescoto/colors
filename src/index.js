import '../node_modules/antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './Store/store';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
const colors =
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <App />
            </Switch>
        </BrowserRouter >
    </Provider >);

ReactDOM.render(colors, document.getElementById('root'));
registerServiceWorker();

/**
 * TODO: 
 * [x] Create Sider
 * [x] Create Color Sliders and make them look nice
 * [x] Create Breadcrumbs that integrate with router
 * [] Create Settings Pages for each type
 * [] Fix settings titles to look nice
 * [] Fix all settings page to maybe use dropdowns
 * [] Set the current settings type
 * [] Write the Colors page
 * [] Create Palette Creator
 * [] Find a way to programmatically pick good companion colors
 * [] Change Manifest and Icon for production use
 * [] Incorporate accounts to keep palettes saved
 * [] Save palettes for offline use in different formats like txt, json
 * [] Copy a color hex or rgb value to clipboard
 * [] Fix sider animation
 * [] Get domain and market!
 */