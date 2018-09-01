import { Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import { PAGE_TYPES } from '../Actions/pageChangedAction';

import React, { Component } from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';

class ControlSider extends Component {
    onCollapse = (collapsed) => {
        this.props.changeCollapse(collapsed);
    }
    onSettingsChange = (e) => {
        const nextPage = e.key;
        this.props.changePage(nextPage);
    }
    render() {
        const { currentPage, siderCollapsed } = this.props;
        return (
            <Layout.Sider style={{ zIndex: 5, overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} collapsible collapsed={siderCollapsed} onCollapse={this.onCollapse}>
                <Menu theme="dark" onClick={this.onSettingsChange} selectedKeys={[currentPage]} mode="inline">
                    <MenuItem key={[PAGE_TYPES.HOME]}><Link to="/colors"><Icon type="picture" /><span>COLORS</span></Link></MenuItem>
                    <MenuItem key={[PAGE_TYPES.SETTINGS]}><Link to="/settings"><Icon type="setting" /><span>ALL SETTINGS</span></Link></MenuItem>
                    <MenuItem key={[PAGE_TYPES.COLOR_PRESET_SETTINGS]}><Link to="/settings/colorPresetSettings"><Icon type="select" /><span>COLOR PRESETS</span></Link></MenuItem>
                    <MenuItem key={[PAGE_TYPES.RGB_SETTINGS]}><Link to="/settings/rgbSettings"><Icon type="eye" /><span>RGB</span></Link></MenuItem>
                    <MenuItem key={[PAGE_TYPES.HEX_SETTINGS]}><Link to="/settings/hexSettings"><Icon type="code" /><span>HEX</span></Link></MenuItem>
                    <MenuItem key={[PAGE_TYPES.HSL_SETTINGS]}><Link to="/settings/hslSettings"><Icon type="pie-chart" /><span>HSL</span></Link></MenuItem>
                </Menu>
            </Layout.Sider >

        );
    }
}


export default ControlSider;