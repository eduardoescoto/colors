import React, { Component } from 'react';

class Color extends Component {
    render() {
        const { id } = this.props.match.params;
        console.log(id)
        return (
            <div>
                {id}
            </div>
        );
    }
}

export default Color;