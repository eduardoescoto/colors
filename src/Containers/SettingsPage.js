import ColorSliderAccordion from '../Components/ColorSliderAccordion';
import changeSettingAction from '../Actions/colorSettingsChangeAction';
import ColorPresetsPickerAccordion from '../Components/ColorPresetsPickerAccordion';
import ColorPresetsPicker from '../Components/ColorPresetsPicker';

import React, { Component } from 'react';
import ColorSlider, { LIMIT_TYPES } from '../Components/ColorSlider'
import changeSelectedSettingAction, { changeTemporarySelectedSettingAction } from '../Actions/changeSelectedSettingAction';

import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { changePageAction, PAGE_TYPES } from '../Actions/pageChangedAction';
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
    saveSetting = () => {
        const { changeSelectedSetting, selectedSetting: { selectedSetting, temporarySelectedSetting }, location: { pathname } } = this.props;
        const { settingsType } = this.getSettingsTypeFromPath(pathname);

        if (selectedSetting !== temporarySelectedSetting && settingsType === PAGE_TYPES.SETTINGS) {
            changeSelectedSetting(temporarySelectedSetting);
        } else if (selectedSetting === temporarySelectedSetting && settingsType !== PAGE_TYPES.SETTINGS) {
            changeSelectedSetting(settingsType);
        }

        this.returnToHomePage();
    }
    returnToHomePage = () => {
        const { history } = this.props;
        history.push(`/${PAGE_TYPES.HOME}`);
    }
    getSlidersBySettingsType = (settingsType) => {
        const { changeSetting, colorSettings: { rgbValues, hslValues, hexValues } } = this.props;

        const rgbSliders = [
            <ColorSlider panelKey={PAGE_TYPES.RGB_SETTINGS} step={1} color="FF0000" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="redValues" settingValue={rgbValues.redValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Red Value' />,
            <ColorSlider panelKey={PAGE_TYPES.RGB_SETTINGS} step={1} color="00FF00" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="greenValues" settingValue={rgbValues.greenValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Green Value' />,
            <ColorSlider panelKey={PAGE_TYPES.RGB_SETTINGS} step={1} color="0000FF" limits={LIMIT_TYPES.RGB_LIMIT} settingPrefix={rgbValues} settingName="blueValues" settingValue={rgbValues.blueValues} settingsType={RGB_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Blue Value' />
        ];
        const hexSliders = [
            <ColorSlider panelKey={PAGE_TYPES.HEX_SETTINGS} step={1} color="FF0000" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="redValues" settingValue={hexValues.redValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Red' />,
            <ColorSlider panelKey={PAGE_TYPES.HEX_SETTINGS} step={1} color="00FF00" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="greenValues" settingValue={hexValues.greenValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Green' />,
            <ColorSlider panelKey={PAGE_TYPES.HEX_SETTINGS} step={1} color="0000FF" limits={LIMIT_TYPES.HEX_LIMIT} settingPrefix={hexValues} settingName="blueValues" settingValue={hexValues.blueValues} settingsType={HEX_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hex Blue' />
        ];
        const hslSliders = [
            <ColorSlider panelKey={PAGE_TYPES.HSL_SETTINGS} step={1} limits={LIMIT_TYPES.HUE_LIMIT} settingPrefix={hslValues} settingName="hueValues" settingValue={hslValues.hueValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName='Hue Value' />,
            <ColorSlider panelKey={PAGE_TYPES.HSL_SETTINGS} step={0.01} limits={LIMIT_TYPES.SATURATION_LIMIT} settingPrefix={hslValues} settingName="saturationValues" settingValue={hslValues.saturationValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName="Saturation Value" />,
            <ColorSlider panelKey={PAGE_TYPES.HSL_SETTINGS} step={0.01} limits={LIMIT_TYPES.LIGHTNESS_LIMIT} settingPrefix={hslValues} settingName="lightnessValues" settingValue={hslValues.lightnessValues} settingsType={HSL_SETTING_CHANGED} changeSetting={changeSetting} sliderName="Lightness Value" />
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
        const { changeSetting, changeTemporarySelectedSetting, selectedSetting: { temporarySelectedSetting }, colorSettings: { colorPresetValues } } = this.props;

        if (settingsType === PAGE_TYPES.COLOR_PRESET_SETTINGS) {
            const colorPresetDisplay = (<ColorPresetsPickerAccordion header={COLOR_PRESETS_SETTING_CHANGED} colorPresetState={colorPresetValues} changeSetting={changeSetting} />);
            optionDisplay = colorPresetDisplay;
        } else if (settingsType === PAGE_TYPES.SETTINGS) {
            const colorPresetDisplay = (<ColorPresetsPicker header={COLOR_PRESETS_SETTING_CHANGED} colorPresetState={colorPresetValues} changeSetting={changeSetting} />);
            const sliders = this.getSlidersBySettingsType(settingsType);
            optionDisplay = (<ColorSliderAccordion temporarySelectedSetting={temporarySelectedSetting} changeTemporarySelectedSetting={changeTemporarySelectedSetting} sliders={sliders} checkBoxesDisplay={colorPresetDisplay} />);
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
                <Row>
                    <h2>
                        {settingHeading}
                    </h2>
                </Row>
                <Row>
                    {optionDisplay}
                </Row>
                <Row>
                    <Col push={19} span={12}>
                        <Button.Group style={{ paddingTop: "10px" }}>
                            <Button onClick={this.saveSetting} size="large" type="primary" ghost>Save</Button>
                            <Button onClick={this.returnToHomePage} size="large" type="danger" ghost>Cancel</Button>
                        </Button.Group>
                    </Col>
                </Row>
            </div >
        );
    }
}
function mapStateToProps({ colorSettings, pages, selectedSetting }) {
    return {
        colorSettings, pages, selectedSetting
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCurrentPage: (page) => dispatch(changePageAction(page)),
        changeSelectedSetting: (setting) => dispatch(changeSelectedSettingAction(setting)),
        changeSetting: (settingsType, value) => dispatch(changeSettingAction(settingsType, value)),
        changeTemporarySelectedSetting: (setting) => dispatch(changeTemporarySelectedSettingAction(setting))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);