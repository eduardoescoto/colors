import Colors from './Colors';
import ControlSider from '../Components/ControlSider';
import SettingsPage from './SettingsPage';

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
    changePage = (e) => {
        console.log(e);
    }
    getHeaderBreadcrumbs = () => {
        const breadcrumbNameMap = {
            '/': 'COLORS',
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
                <Link to="/">COLORS</Link>
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
        return (
            <Layout style={{ minHeight: '100vh' }} >
                <ControlSider changeCollapse={changeSiderCollapsed} siderCollapsed={siderCollapsed} changePage={changeCurrentPage} currentPage={currentPage} />
                <Layout style={{ background: "rgb(240, 242, 245)", transition: "background 0.5s ease 0.2s, width 0.4s ease 0.2s", marginLeft: siderCollapsed ? 80 : 200 }}>
                    <Header style={{ display: "flex", alignItems: "center", position: 'fixed', zIndex: 10, width: '100%', background: '#fff', padding: 0 }}>
                        <Breadcrumb style={{ fontSize: "30px", padding: "20px 10px 10px 20px" }} separator="|" >{this.getHeaderBreadcrumbs()}</Breadcrumb>
                    </Header>
                    <Content style={{ margin: '75px 75px 50px 75px', overflow: 'initial' }}>
                        <Route path='/settings/rgbSettings' component={SettingsPage} />
                        <Route path='/settings/hexSettings' component={SettingsPage} />
                        <Route path='/settings/hslSettings' component={SettingsPage} />
                        <Route path='/settings/colorPresetSettings' component={SettingsPage} />
                        <Route exact path='/settings' component={SettingsPage} />
                        <Route exact path='/' component={Colors} />
                    </Content>
                    <Footer style={{ background: "#FFF", textAlign: 'center' }}>
                        <h3>COLORS, MADE WITH <span role="img" aria-label="LOVE">💖</span> BY ED HEHE xD</h3>
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
