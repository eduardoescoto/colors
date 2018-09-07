import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import React, { Component } from 'react';

import ColorPage from './ColorPage';
import Colors from '../Containers/Colors';
import SettingsPage from '../Containers/SettingsPage';


class AppRoutes extends Component {
    render() {
        return (
            <Layout.Content style={{ margin: '75px 50px 75px 50px', overflow: 'initial' }}>
                <Route path='/settings/rgbSettings' component={SettingsPage} />
                <Route path='/settings/hexSettings' component={SettingsPage} />
                <Route path='/settings/hslSettings' component={SettingsPage} />
                <Route path='/settings/colorPresetSettings' component={SettingsPage} />
                <Route path='/colors/:id' component={ColorPage} />
                <Route exact path='/settings' component={SettingsPage} />
                <Route exact path='/colors' component={Colors} />
                <Route exact path='/' component={Colors} />
            </Layout.Content>
        );
    }
}

export default AppRoutes;