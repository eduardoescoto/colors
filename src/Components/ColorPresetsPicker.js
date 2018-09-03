import React, { Component } from 'react';
import { Checkbox, Row, Col, Button } from 'antd';
import { COLOR_PRESETS_SETTING_CHANGED, COLOR_PRESETS } from '../Actions/colorSettingsChangeAction';

class ColorPresetsPicker extends Component {
    getColorPresetCheckboxGroup = (presets) => {
        const presetKeys = Object.keys(presets);

        const options = presetKeys.map((key) => {
            const label = presets[key];
            const checkbox = (<Col key={key} span={8}><Checkbox value={key}>{label}</Checkbox></Col>);
            return checkbox;
        });

        const colorPresetCheckboxGroup = (
            <div>
                <Checkbox.Group value={this.getIsCheckedArray(presets)} onChange={this.onCheckboxChange} style={{ width: "100%" }}>
                    <Row>
                        {options}
                    </Row>
                </Checkbox.Group>
                <Button.Group style={{ paddingTop: "10px" }}>
                    <Button type="primary" ghost onClick={this.selectAllCheckBoxes}>Select All</Button>
                    <Button type="danger" ghost onClick={this.deselectAllCheckBoxes}>Deselect All</Button>
                </Button.Group>
            </div>
        );
        return colorPresetCheckboxGroup;
    }
    isChecked = (key) => {
        const { colorPresetState } = this.props;
        const keyExists = colorPresetState.includes(key);
        return keyExists;
    }
    getIsCheckedArray = (presets) => {
        const keys = Object.keys(presets);

        let isCheckedArray = [];
        keys.forEach((key) => {
            if (this.isChecked(key)) {
                isCheckedArray.push(key);
            }
        })

        return isCheckedArray;
    }
    selectAllCheckBoxes = () => {
        const allColorKeys = Object.keys(COLOR_PRESETS);
        this.onCheckboxChange(allColorKeys);
    }
    deselectAllCheckBoxes = () => {
        this.onCheckboxChange([]);
    }
    onCheckboxChange = (selectedBoxes) => {
        const { changeSetting } = this.props;
        changeSetting(COLOR_PRESETS_SETTING_CHANGED, selectedBoxes);
    }
    render() {
        const colorCheckboxGroup = this.getColorPresetCheckboxGroup(COLOR_PRESETS);
        return (colorCheckboxGroup);
    }
}

export default ColorPresetsPicker;