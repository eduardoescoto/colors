import React, { Component } from 'react';

import { Slider, Radio } from 'antd';
import { VALUE_TYPES } from '../Actions/colorSettingsChangeAction';

export const LIMIT_TYPES = {
    RGB_LIMIT: "RGB_LIMIT",
    HUE_LIMIT: "HUE_LIMIT",
    LIGHTNESS_LIMIT: "LIGHTNESS_LIMIT",
    SATURATION_LIMIT: "SATURATION_LIMIT",
    HEX_LIMIT: "HEX_LIMIT"
}

const rgbLimits = {
    min: 0,
    max: 255,
    marks: (...args) => {
        return {
            0: {
                style: {
                    color: "#000",
                },
                label: <strong>0</strong>
            },
            255: {
                style: {
                    color: `#${args ? args[1] : "#000"}`,
                },
                label: <strong>255</strong>
            }
        }
    }
}
const hueLimits = {
    min: 0,
    max: 360,
    marks: () => {
        return {
            0: {
                style: {
                    color: "#F00",
                },
                label: <strong>0°</strong>
            },
            60: {
                style: {
                    color: "#FF0"
                },
                label: <strong>60°</strong>
            },
            120: {
                style: {
                    color: "#0F0"
                },
                label: <strong>120°</strong>
            },
            180: {
                style: {
                    color: "#0FF"
                },
                label: <strong>180°</strong>
            },
            240: {
                style: {
                    color: "#00F"
                },
                label: <strong>240°</strong>
            },
            300: {
                style: {
                    color: "#F0F"
                },
                label: <strong>300°</strong>
            },
            360: {
                style: {
                    color: "#F00",
                },
                label: <strong>360°</strong>
            }
        }
    }
}
const saturationLimits = {
    min: 0,
    max: 1,
    marks: () => {
        return {
            0: {
                style: {
                    color: "#000",
                },
                label: <strong>0%</strong>
            },
            1: {
                style: {
                    color: "#000",
                },
                label: <strong>100%</strong>
            }
        }
    }
}
const lightnessLimits = {
    min: 0,
    max: 1,
    marks: () => {
        return {
            0: {
                style: {
                    color: "#000",
                },
                label: <strong>0%</strong>
            },
            1: {
                style: {
                    color: "#000",
                },
                label: <strong>100%</strong>
            }
        }
    }
}
const hexLimits = {
    min: 0,
    max: 255,
    marks: (...args) => {
        return {
            0: {
                style: {
                    color: "#000",
                },
                label: <strong>00</strong>
            },
            255: {
                style: {
                    color: `#${args ? args[1] : "000"}`,
                },
                label: <strong>FF</strong>
            }
        }
    }
}

class ColorSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    sliderSettingChanged = ({ target }) => {
        let values = this.props.settingValue;
        let settingsPrefix = this.props.settingPrefix;

        values.valueType = target.value;

        if (this.props.settingPrefix) {
            settingsPrefix[this.props.settingName] = values;
            values = settingsPrefix;
        }

        this.props.changeSetting(this.props.settingsType, values);
    }
    sliderValueChanged = (value) => {
        let values = this.props.settingValue;
        let settingsPrefix = this.props.settingPrefix;

        const rangeBool = this.getRangeBool(this.props.settingValue.valueType);
        if (rangeBool) {
            values.ranged = value;
        } else {
            values.exact = value;
        }

        if (this.props.settingPrefix) {
            settingsPrefix[this.props.settingName] = values;
            values = settingsPrefix;
        }

        this.props.changeSetting(this.props.settingsType, values);
    }
    formatter = (value) => {
        if (!value) { return ""; }
        let formattedValue;
        switch (this.props.limits) {
            case LIMIT_TYPES.RGB_LIMIT: formattedValue = value; break;
            case LIMIT_TYPES.HUE_LIMIT: formattedValue = `${value}°`; break;
            case LIMIT_TYPES.LIGHTNESS_LIMIT: formattedValue = `${Math.round(value * 100)}%`; break;
            case LIMIT_TYPES.SATURATION_LIMIT: formattedValue = `${Math.round(value * 100)}%`; break;
            case LIMIT_TYPES.HEX_LIMIT: formattedValue = `${String(value.toString(16)).toUpperCase()}`; break;

            default: formattedValue = value;
        }

        return formattedValue;
    }
    getRangeBool = (range) => {
        let rangeBool;
        if (range === VALUE_TYPES.RANGED) {
            rangeBool = true;
        } else if (range === VALUE_TYPES.EXACT) {
            rangeBool = false;
        }
        return rangeBool;
    }
    getSliderFromState = () => {
        const { exact, ranged, valueType } = this.props.settingValue;
        const { limit } = this.state;

        const rangeBool = this.getRangeBool(valueType);
        const value = rangeBool ? ranged : exact;
        const color = this.props.color;
        const slider = (<Slider marks={limit.marks`${color}`} step={this.props.step} tipFormatter={this.formatter} onChange={this.sliderValueChanged} value={value} included={rangeBool} range={rangeBool} min={limit.min} max={limit.max}></Slider>);
        return slider;
    }
    componentWillMount() {
        const { limits } = this.props;
        let limit;
        switch (limits) {
            case LIMIT_TYPES.RGB_LIMIT: limit = rgbLimits; break;
            case LIMIT_TYPES.HUE_LIMIT: limit = hueLimits; break;
            case LIMIT_TYPES.LIGHTNESS_LIMIT: limit = lightnessLimits; break;
            case LIMIT_TYPES.SATURATION_LIMIT: limit = saturationLimits; break;
            case LIMIT_TYPES.HEX_LIMIT: limit = hexLimits; break;
            default: limit = { min: 0, max: 100, defaultValue: 50, defaultValues: [25, 75] }; break;
        }
        this.setState({ limit })
    }
    render() {
        let slider = this.getSliderFromState();
        return (
            <div>
                {/* <h2>{this.props.sliderName}</h2> */}
                <Radio.Group value={this.props.settingValue.valueType} buttonStyle="solid" onChange={this.sliderSettingChanged}>
                    <Radio.Button value={VALUE_TYPES.RANGED}>By Ranged Value</Radio.Button>
                    <Radio.Button value={VALUE_TYPES.EXACT}>By Exact Value</Radio.Button>
                </Radio.Group>
                {slider}
            </div >
        );
    }
}

export default ColorSlider;