import { Layout } from 'antd';
import SiderMenu from './SiderMenu';

import React, { Component } from 'react';

class ControlSider extends Component {
    onCollapse = (collapsed) => {
        const { changeCollapse } = this.props;
        changeCollapse(collapsed);
    }
    render() {
        const { onCollapse, props: { siderCollapsed } } = this;
        const siderStyles = {
            left: 0,
            zIndex: 5,
            height: '100vh',
            overflow: 'auto',
            position: 'fixed'
        };

        return (
            <Layout.Sider style={siderStyles} collapsed={siderCollapsed} onCollapse={onCollapse} collapsible>
                <SiderMenu {...this.props} />
            </Layout.Sider >
        );
    }
}


export default ControlSider;