import { Layout } from 'antd'

import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const { minWidth, marginLeft: paddingLeft } = this.props;
        const headerStyle = { textAlign: "center", padding: 0, margin: 0 };
        const footerStyle = {
            minWidth,
            paddingLeft,
            right: 0,
            bottom: 0,
            zIndex: 3,
            width: "100%",
            position: "fixed",
            overflow: "auto",
            paddingTop: "12px",
            background: "#FFF",
            paddingRight: "0px",
            paddingBottom: "12px",
            borderTop: '1px solid rgb(217, 217, 217)'
        };

        return (
            <Layout.Footer style={footerStyle}>
                <h3 style={headerStyle}>COLORS, MADE WITH <span role="img" aria-label="LOVE">💖</span> BY ED HEHE xD</h3>
            </Layout.Footer>
        );
    }
}

export default Footer;