import HeaderBreadcrumb from './HeaderBreadcrumb';

import { Layout } from 'antd';

import React, { Component } from 'react';

class Header extends Component {
    render() {
        const { minWidth } = this.props;
        const style = {
            minWidth,
            zIndex: 3,
            padding: 0,
            width: '100%',
            position: 'fixed',
            background: '#fff'
        }

        return (
            <Layout.Header style={style}>
                <HeaderBreadcrumb {...this.props} />
            </Layout.Header>
        );
    }
}

export default Header;