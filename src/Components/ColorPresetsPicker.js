import React, { Component } from 'react';
import { COLOR_PRESETS } from '../Actions/colorSettingsChangeAction';
import { Radio } from 'antd';

class ColorPresetsPicker extends Component {
    getColorPresetRadioGroup = (presets) => {
        const presetKeys = Object.keys(presets);
        const options = presetKeys.map((key) => {
            return (<Radio.Button key={key} value={key}>{presets[key]}</Radio.Button>);
        });
        const colorPresetRadioGroup = (<Radio.Group buttonStyle="solid">{options}</Radio.Group>)
        return colorPresetRadioGroup;
    }
    render() {
        const colorRadioGroup = this.getColorPresetRadioGroup(COLOR_PRESETS);
        return (colorRadioGroup);
    }
}

export default ColorPresetsPicker;