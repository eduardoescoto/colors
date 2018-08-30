import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSettingAction } from '../Actions/colorSettingsChangeAction'
import { changePageAction, PAGE_TYPES } from '../Actions/pageChangedAction';
import {
    HSL_SETTING_CHANGED,
    HEX_SETTING_CHANGED,
    RGB_SETTING_CHANGED
} from '../Actions/colorSettingsChangeAction';
import ColorSlider, { LIMIT_TYPES } from '../Components/ColorSlider'
class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getSettingsTypeFromPath = (path) => {
        const splitPath = path.split("/");
        const settingsType = splitPath[splitPath.length - 1];
        return settingsType;
    }
    getSlidersBySettingsType = (settingsType) => {
        const { changeSetting } = this.props;
        const { rgbValues, hslValues, hexValues } = this.props.colorSettings;
        const rgbSliders = (
            <div>
                <ColorSlider step={1} color="FF0000" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="redValues" settingValue={rgbValues.redValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Red Value' />
                <ColorSlider step={1} color="00FF00" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="greenValues" settingValue={rgbValues.greenValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Green Value' />
                <ColorSlider step={1} color="0000FF" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="blueValues" settingValue={rgbValues.blueValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Blue Value' />
            </div>
        );
        const hexSliders = (
            <div>
                <ColorSlider step={1} color="FF0000" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="redValues" settingValue={hexValues.redValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Red' />
                <ColorSlider step={1} color="00FF00" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="redValues" settingValue={hexValues.greenValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Green' />
                <ColorSlider step={1} color="0000FF" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="redValues" settingValue={hexValues.blueValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Blue' />
            </div>
        );
        const hslSliders = (
            <div>
                <ColorSlider step={1} limits={LIMIT_TYPES.HUE_LIMIT} settingPrefix={hslValues} settingName="hueValues" settingValue={hslValues.hueValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hue Value' />
                <ColorSlider step={0.01} limits={LIMIT_TYPES.SATURATION_LIMIT} settingPrefix={hslValues} settingName="saturationValues" settingValue={hslValues.saturationValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName="Saturation Value" />
                <ColorSlider step={0.01} limits={LIMIT_TYPES.LIGHTNESS_LIMIT} settingPrefix={hslValues} settingName="lightnessValues" settingValue={hslValues.lightnessValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName="Lightness Value" />
            </div>
        );
        let sliders;
        switch (settingsType) {
            case PAGE_TYPES.HEX_SETTINGS: sliders = hexSliders; break;
            case PAGE_TYPES.RGB_SETTINGS: sliders = rgbSliders; break;
            case PAGE_TYPES.HSL_SETTINGS: sliders = hslSliders; break;
            default: sliders = rgbSliders; break;
        }
        return sliders;
    }
    componentWillMount() {
        const { pathname } = this.props.location;
        const settingsType = this.getSettingsTypeFromPath(pathname);
        this.setState({ settingsType });
    }
    render() {
        const { pathname } = this.props.location;
        const settingsType = this.getSettingsTypeFromPath(pathname);
        const sliders = this.getSlidersBySettingsType(settingsType);
        return (
            <div>
                <h2>{this.state.settingsType}</h2>
                {sliders}
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