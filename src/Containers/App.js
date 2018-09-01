import Colors from './Colors';
import Color from '../Components/Color';
import SettingsPage from './SettingsPage';
import ControlSider from '../Components/ControlSider';

import { changeSettingAction } from '../Actions/colorSettingsChangeAction'
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { changePageAction, changeSiderCollapseAction } from '../Actions/pageChangedAction';

class App extends Component {
    componentWillMount() {
        const initialLocation = this.props.location.pathname;
        this.props.changeCurrentPage(initialLocation);
    }
    getHeaderBreadcrumbs = () => {
        const breadcrumbNameMap = {
            '/settings': 'SETTINGS',
            '/settings/rgbSettings': 'RGB',
            '/settings/hexSettings': 'HEX',
            '/settings/hslSettings': 'HSL',
            '/settings/colorPresetSettings': 'PRESETS'
        };
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="COLORS">
                <Link to="/colors">COLORS</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        return breadcrumbItems;
    }
    componentDidUpdate(prevProps) {
        const prevPath = prevProps.location.pathname;
        const currentPath = this.props.location.pathname;
        if (prevPath !== currentPath) {
            this.props.changeCurrentPage(currentPath);
        }
    }
    render() {
        const { Header, Content, Footer } = Layout;
        const { siderCollapsed, currentPage } = this.props.pages;
        const { changeSiderCollapsed, changeCurrentPage } = this.props;
        const siderCollapsedPadding = { collapsed: 80, expanded: 200 };
        const siderCollapsedMinWidth = { collapsed: 500, expanded: 620 };
        
        return (
            <Layout style={{ minHeight: '100vh', minWidth: siderCollapsed ? siderCollapsedMinWidth.collapsed : siderCollapsedMinWidth.expanded }} >
                <ControlSider changeCollapse={changeSiderCollapsed} siderCollapsed={siderCollapsed} changePage={changeCurrentPage} currentPage={currentPage} />
                <Layout style={{ background: "rgb(240, 242, 245)", transition: "background 0.5s ease 0.2s, width 0.4s ease 0.2s", marginLeft: siderCollapsed ? siderCollapsedPadding.collapsed : siderCollapsedPadding.expanded }}>
                    <Header style={{ minWidth: siderCollapsed ? siderCollapsedMinWidth.collapsed : siderCollapsedMinWidth.expanded, position: 'fixed', zIndex: 3, width: '100%', background: '#fff', padding: 0 }}>
                        <Breadcrumb style={{ fontSize: "30px", padding: "20px 10px 10px 20px" }} separator=" " >{this.getHeaderBreadcrumbs()}</Breadcrumb>
                    </Header>
                    <Content style={{ margin: '75px 50px 75px 50px', overflow: 'initial' }}>
                        <Route path='/settings/rgbSettings' component={SettingsPage} />
                        <Route path='/settings/hexSettings' component={SettingsPage} />
                        <Route path='/settings/hslSettings' component={SettingsPage} />
                        <Route path='/settings/colorPresetSettings' component={SettingsPage} />
                        <Route path='/colors/:id' component={Color} />
                        <Route exact path='/settings' component={SettingsPage} />
                        <Route exact path='/colors' component={Colors} />
                        <Route exact path='/' component={Colors} />
                    </Content>
                    <Footer style={{ overflow: "auto", minWidth: siderCollapsed ? siderCollapsedMinWidth.collapsed : siderCollapsedMinWidth.expanded, width: "100%", zIndex: 3, position: "fixed", bottom: 0, right: 0, padding: `12px 60px`, paddingRight: "0px", paddingLeft: siderCollapsed ? siderCollapsedPadding.collapsed : siderCollapsedPadding.expanded, background: "#FFF" }}>
                        <h3 style={{ textAlign: "center", padding: 0, margin: 0 }}>COLORS, MADE WITH <span role="img" aria-label="LOVE">💖</span> BY ED HEHE xD</h3>
                    </Footer>
                </Layout>
            </Layout >
        );
    }
}
function mapStateToProps({ colorSettings, pages }) {
    return {
        pages,
        colorSettings
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCurrentPage: (page) => dispatch(changePageAction(page)),
        changeSiderCollapsed: (collapsed) => dispatch(changeSiderCollapseAction(collapsed)),
        changeSetting: (settingsType, value) => dispatch(changeSettingAction(settingsType, value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
