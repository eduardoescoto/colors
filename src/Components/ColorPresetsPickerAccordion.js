import React, { Component } from 'react';
import ColorPresetsPicker from './ColorPresetsPicker';
import { Collapse } from 'antd';
class ColorPresetsPickerAccordion extends Component {
    render() {
        const { header, colorPresetState, changeSetting } = this.props;
        return (
            <Collapse defaultActiveKey={[header]}>
                <Collapse.Panel key={header} header={header}>
                    <ColorPresetsPicker colorPresetState={colorPresetState} changeSetting={changeSetting} />
                </Collapse.Panel>
            </Collapse>
        );
    }
}

export default ColorPresetsPickerAccordion;