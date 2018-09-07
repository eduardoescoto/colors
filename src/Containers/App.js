import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AppRoutes from '../Components/AppRoutes';
import ControlSider from '../Components/ControlSider';
import changeSettingAction from '../Actions/colorSettingsChangeAction';

import React, { Component } from 'react';

import { Layout } from 'antd';
import { connect } from 'react-redux';
import { changePageAction, changeSiderCollapseAction } from '../Actions/pageChangedAction';

class App extends Component {
    componentWillMount() {
        const { changeCurrentPage, location: { pathname: initialLocation } } = this.props;
        changeCurrentPage(initialLocation);
    }
    componentDidUpdate(prevProps) {
        const { pathname: prevPath } = prevProps.location;
        const { changeCurrentPage, location: { pathname: currentPath } } = this.props;

        if (prevPath !== currentPath) {
            changeCurrentPage(currentPath);
        }
    }
    getSiderCollapsedStyles = (siderCollapsed) => {
        const siderCollapsedData = {
            collapsed: siderCollapsed,
            collapsedPadding: { collapsed: 80, expanded: 200 },
            collapsedMinWidth: { collapsed: 500, expanded: 620 }
        };
        const styleData = {
            minWidth: (siderCollapsedData.collapsed ? siderCollapsedData.collapsedMinWidth.collapsed : siderCollapsedData.collapsedMinWidth.expanded),
            marginLeft: (siderCollapsedData.collapsed ? siderCollapsedData.collapsedPadding.collapsed : siderCollapsedData.collapsedPadding.expanded),
        }
        return styleData;
    }
    render() {
        const { changeSiderCollapsed, changeCurrentPage, pages: { siderCollapsed, currentPage } } = this.props;
        const { minWidth, marginLeft } = this.getSiderCollapsedStyles(siderCollapsed);

        return (
            <Layout style={{ minHeight: '100vh', minWidth }} >
                <ControlSider changeCollapse={changeSiderCollapsed} siderCollapsed={siderCollapsed} changePage={changeCurrentPage} currentPage={currentPage} />
                <Layout style={{ backgroundColor: "rgb(240, 242, 245)", transition: "background 0.5s ease 0.2s, width 0.4s ease 0.2s", marginLeft }}>
                    <Header minWidth {...this.props} />
                    <AppRoutes />
                    <Footer minWidth marginLeft {...this.props} />
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
