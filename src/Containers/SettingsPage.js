import ColorSliderAccordion from '../Components/ColorSliderAccordion';
import ColorPresetsPicker from '../Components/ColorPresetsPicker';

import React, { Component } from 'react';
import ColorSlider, { LIMIT_TYPES } from '../Components/ColorSlider'

import { connect } from 'react-redux';
import { changePageAction, PAGE_TYPES } from '../Actions/pageChangedAction';
import { changeSettingAction } from '../Actions/colorSettingsChangeAction'
import {
    HSL_SETTING_CHANGED,
    HEX_SETTING_CHANGED,
    RGB_SETTING_CHANGED,
    SETTINGS_MODE_CHANGED,
    COLOR_PRESETS_SETTING_CHANGED
} from '../Actions/colorSettingsChangeAction';

class SettingsPage extends Component {
    getSettingsTypeFromPath = (path) => {
        const splitPath = path.split("/");
        const settingsType = splitPath[splitPath.length - 1];
        let settings;
        switch (settingsType) {
            case PAGE_TYPES.SETTINGS: settings = { settingHeading: SETTINGS_MODE_CHANGED, settingsType: PAGE_TYPES.SETTINGS }; break;
            case PAGE_TYPES.RGB_SETTINGS: settings = { settingHeading: RGB_SETTING_CHANGED, settingsType: PAGE_TYPES.RGB_SETTINGS }; break;
            case PAGE_TYPES.HEX_SETTINGS: settings = { settingHeading: HEX_SETTING_CHANGED, settingsType: PAGE_TYPES.HEX_SETTINGS }; break;
            case PAGE_TYPES.HSL_SETTINGS: settings = { settingHeading: HSL_SETTING_CHANGED, settingsType: PAGE_TYPES.HSL_SETTINGS }; break;
            case PAGE_TYPES.COLOR_PRESET_SETTINGS: settings = { settingHeading: COLOR_PRESETS_SETTING_CHANGED, settingsType: PAGE_TYPES.COLOR_PRESET_SETTINGS }; break;
            default: settings = { settingHeading: RGB_SETTING_CHANGED, settingsType: PAGE_TYPES.RGB_SETTINGS }; break;
        }
        return settings;
    }
    getSlidersBySettingsType = (settingsType) => {
        const { changeSetting } = this.props;
        const { rgbValues, hslValues, hexValues } = this.props.colorSettings;

        const rgbSliders = [
            <ColorSlider step={1} color="FF0000" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="redValues" settingValue={rgbValues.redValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Red Value' />,
            <ColorSlider step={1} color="00FF00" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="greenValues" settingValue={rgbValues.greenValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Green Value' />,
            <ColorSlider step={1} color="0000FF" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="blueValues" settingValue={rgbValues.blueValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Blue Value' />
        ];
        const hexSliders = [
            <ColorSlider step={1} color="FF0000" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="redValues" settingValue={hexValues.redValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Red' />,
            <ColorSlider step={1} color="00FF00" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="greenValues" settingValue={hexValues.greenValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Green' />,
            <ColorSlider step={1} color="0000FF" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="blueValues" settingValue={hexValues.blueValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Blue' />
        ];
        const hslSliders = [
            <ColorSlider step={1} limits={LIMIT_TYPES.HUE_LIMIT} settingPrefix={hslValues} settingName="hueValues" settingValue={hslValues.hueValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hue Value' />,
            <ColorSlider step={0.01} limits={LIMIT_TYPES.SATURATION_LIMIT} settingPrefix={hslValues} settingName="saturationValues" settingValue={hslValues.saturationValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName="Saturation Value" />,
            <ColorSlider step={0.01} limits={LIMIT_TYPES.LIGHTNESS_LIMIT} settingPrefix={hslValues} settingName="lightnessValues" settingValue={hslValues.lightnessValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName="Lightness Value" />
        ];

        let optionDisplay;
        switch (settingsType) {
            case PAGE_TYPES.SETTINGS: optionDisplay = [hslSliders, hexSliders, rgbSliders]; break;
            case PAGE_TYPES.HEX_SETTINGS: optionDisplay = [hexSliders]; break;
            case PAGE_TYPES.RGB_SETTINGS: optionDisplay = [rgbSliders]; break;
            case PAGE_TYPES.HSL_SETTINGS: optionDisplay = [hslSliders]; break;
            default: optionDisplay = [rgbSliders]; break;
        }
        return optionDisplay;
    }
    getOptionDisplayFromSettingsType = (settingsType) => {
        let optionDisplay;
        const { changeSetting } = this.props;
        const { colorPresetValues } = this.props.colorSettings;

        if (settingsType === PAGE_TYPES.COLOR_PRESET_SETTINGS) {
            optionDisplay = (<ColorPresetsPicker colorPresetState={colorPresetValues} changeSetting={changeSetting} />);
        } else if (settingsType === PAGE_TYPES.SETTINGS) {
            const sliders = this.getSlidersBySettingsType(settingsType);
            const checkBoxes = (<ColorPresetsPicker colorPresetState={colorPresetValues} changeSetting={changeSetting} />);
            optionDisplay = (<ColorSliderAccordion sliders={sliders} checkBoxes={checkBoxes} />);
        }
        else {
            const sliders = this.getSlidersBySettingsType(settingsType);
            optionDisplay = (<ColorSliderAccordion sliders={sliders} />);
        }
        return optionDisplay;
    }
    render() {
        const { pathname } = this.props.location;
        const { settingsType, settingHeading } = this.getSettingsTypeFromPath(pathname);
        const optionDisplay = this.getOptionDisplayFromSettingsType(settingsType);
        return (
            <div>
                <h2>
                    {settingHeading}
                </h2>
                {optionDisplay}
            </div>
        );
    }
}
function mapStateToProps({ colorSettings, pages }) {
    return {
        colorSettings, pages
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCurrentPage: (page) => dispatch(changePageAction(page)),
        changeSetting: (settingsType, value) => dispatch(changeSettingAction(settingsType, value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);