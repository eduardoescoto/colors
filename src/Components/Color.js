import React, { Component } from 'react';

import { colorExistsInNamedColors, getColorName } from '../Utilities/colorMethods';

class Color extends Component {
    render() {
        const { id } = this.props;
        // console.log(colorExistsInNamedColors(id), getColorName(id));
        return (
            <div style={{ backgroundColor: id, width: "40px", height: "40px" }}>

            </div>
        );
    }
}

export default Color;