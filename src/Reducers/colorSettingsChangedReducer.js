import {
    SETTINGS_MODE,
    COLOR_ARCHETYPES,
    HSL_SETTING_CHANGED,
    RGB_SETTING_CHANGED,
    HEX_SETTING_CHANGED,
    COLOR_ARCHETYPES_SETTING_CHANGED,
    VALUE_TYPES
} from '../Actions/colorSettingsChangeAction';

let initialState = {
    settingsMode: SETTINGS_MODE.TYPES,
    colorType: Object.values(COLOR_ARCHETYPES),
    hslValues: {
        hueValues: {
            exact: 240,
            ranged: [60, 240],
            valueType: VALUE_TYPES.RANGED
        },
        saturationValues: {
            exact: 0.5,
            ranged: [.25, .50],
            valueType: VALUE_TYPES.RANGED
        },
        lightnessValues: {
            exact: 0.5,
            ranged: [.25, .50],
            valueType: VALUE_TYPES.RANGED
        }
    },
    rgbValues: {
        redValues: {
            exact: 100,
            ranged: [50, 175],
            valueType: VALUE_TYPES.RANGED
        },
        greenValues: {
            exact: 100,
            ranged: [50, 175],
            valueType: VALUE_TYPES.RANGED
        },
        blueValues: {
            exact: 100,
            ranged: [50, 175],
            valueType: VALUE_TYPES.RANGED
        }
    },
    hexValues: {
        redValues: {
            exact: 100,
            ranged: [50, 175],
            valueType: VALUE_TYPES.RANGED
        },
        greenValues: {
            exact: 100,
            ranged: [50, 175],
            valueType: VALUE_TYPES.RANGED
        },
        blueValues: {
            exact: 100,
            ranged: [50, 175],
            valueType: VALUE_TYPES.RANGED
        }
    }
}

function colorSettingsChangedReducer(state = initialState, { type, payload }) {
    switch (type) {
        case HSL_SETTING_CHANGED: state = { ...state, hslValues: payload }; break;
        case HEX_SETTING_CHANGED: state = { ...state, hexValues: payload }; break;
        case RGB_SETTING_CHANGED: state = { ...state, rgbValues: payload }; break;
        case COLOR_ARCHETYPES_SETTING_CHANGED: state = { ...state, colorType: payload }; break;
        default: state = { ...state }; break;
    }
    return state;
}

export default colorSettingsChangedReducer;