import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import React, { Component } from 'react';

const breadcrumbNameMap = {
    '/settings': 'SETTINGS',
    '/settings/rgbSettings': 'RGB',
    '/settings/hexSettings': 'HEX',
    '/settings/hslSettings': 'HSL',
    '/settings/colorPresetSettings': 'PRESETS'
};

class HeaderBreadcrumb extends Component {
    getPathSnippets = () => {
        const { pathname } = this.props.location;
        const pathSnippets = pathname.split('/').filter(i => i);
        return pathSnippets;
    }
    getExtraBreadCrumbItems = (pathSnippets) => {
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
        return extraBreadcrumbItems;
    }
    getAllBreadCrumbItems = (extraBreadcrumbItems) => {
        const breadcrumbItems = [(
            <Breadcrumb.Item key="COLORS">
                <Link to="/colors">COLORS</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        return breadcrumbItems;
    }
    getHeaderBreadcrumbs = () => {
        const { getPathSnippets, getExtraBreadCrumbItems, getAllBreadCrumbItems } = this;
        const pathSnippets = getPathSnippets();
        const extraBreadcrumbItems = getExtraBreadCrumbItems(pathSnippets);
        const breadcrumbItems = getAllBreadCrumbItems(extraBreadcrumbItems);
        return breadcrumbItems;
    }
    render() {
        const breadCrumbItems = this.getHeaderBreadcrumbs();
        const breadCrumbStyles = {
            fontSize: "30px",
            padding: "20px 10px 10px 20px"
        };
        return (<Breadcrumb style={breadCrumbStyles} separator=" ">{breadCrumbItems}</Breadcrumb>);
    }
}

export default HeaderBreadcrumb;