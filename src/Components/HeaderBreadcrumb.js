import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import React, { Component } from 'react';

class HeaderBreadcrumb extends Component {
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
    render() {
        return (<Breadcrumb style={{ fontSize: "30px", padding: "20px 10px 10px 20px" }} separator=" ">{this.getHeaderBreadcrumbs()}</Breadcrumb>);
    }
}

export default HeaderBreadcrumb;