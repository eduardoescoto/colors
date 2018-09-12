import React, { Component } from 'react';
import { Card, Icon } from 'antd';


// import { colorExistsInNamedColors, getColorName } from '../Utilities/colorMethods';

class Color extends Component {
    render() {
        const { id } = this.props;
        // console.log(colorExistsInNamedColors(id), getColorName(id));
        return (
            <Card
                style={{ width: 300 }}
                cover={<div style={{ width: "100%", height: "80px", backgroundColor: id }}></div>}
                actions={[<Icon type="copy" />]}>
                <Card.Meta
                    title={id}
                    description="This is the description"
                />
            </Card>
        );
    }
}

export default Color;