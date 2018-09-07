import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { PAGE_TYPES } from '../Actions/pageChangedAction';

class SiderMenu extends Component {
    onSettingsChange = (event) => {
        const { changePage } = this.props;
        const nextPage = event.key;

        changePage(nextPage);
    }
    render() {
        const { onSettingsChange, props: { currentPage } } = this;

        return (
            <Menu theme="dark" onClick={onSettingsChange} selectedKeys={[currentPage]} mode="inline">
                <Menu.Item key={[PAGE_TYPES.HOME]}><Link to="/colors"><Icon type="picture" /><span>COLORS</span></Link></Menu.Item>
                <Menu.Item key={[PAGE_TYPES.SETTINGS]}><Link to="/settings"><Icon type="setting" /><span>ALL SETTINGS</span></Link></Menu.Item>
                <Menu.Item key={[PAGE_TYPES.COLOR_PRESET_SETTINGS]}><Link to="/settings/colorPresetSettings"><Icon type="select" /><span>COLOR PRESETS</span></Link></Menu.Item>
                <Menu.Item key={[PAGE_TYPES.RGB_SETTINGS]}><Link to="/settings/rgbSettings"><Icon type="eye" /><span>RGB</span></Link></Menu.Item>
                <Menu.Item key={[PAGE_TYPES.HEX_SETTINGS]}><Link to="/settings/hexSettings"><Icon type="code" /><span>HEX</span></Link></Menu.Item>
                <Menu.Item key={[PAGE_TYPES.HSL_SETTINGS]}><Link to="/settings/hslSettings"><Icon type="pie-chart" /><span>HSL</span></Link></Menu.Item>
            </Menu>
        );
    }
}

export default SiderMenu;