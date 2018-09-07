import React, { Component } from 'react';

class ColorPage extends Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                {id}
            </div>
        );
    }
}

export default ColorPage;