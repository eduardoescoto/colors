export const COLOR_ARCHETYPES_SETTING_CHANGED = "COLOR_ARCHETYPES_SETTING_CHANGED"
export const COLOR_ARCHETYPES = {
    REDS: 'red',
    PINKS: 'pink',
    BLUES: 'blue',
    GREYS: 'grey',
    GREENS: 'green',
    BLACKS: 'black',
    WHITES: 'white',
    PASTELS: 'pastel',
    ORANGES: 'orange',
    PURPLES: 'purple'
}

export const VALUE_TYPES = {
    RANGED: "RANGED",
    EXACT: "EXACT"
}

export const SETTINGS_MODE_CHANGED = "SETTINGS_MODE_CHANGED";
export const SETTINGS_MODE = {
    HSL: 'HSL',
    RGB: 'RGB',
    HEX: 'HEX',
    TYPES: 'TYPES'
}

export const HSL_SETTING_CHANGED = "HSL_SETTING_CHANGED";
export const RGB_SETTING_CHANGED = "RGB_SETTING_CHANGED";
export const HEX_SETTING_CHANGED = "HEX_SETTING_CHANGED";


export function changeSettingAction(settingChange, settingsValue) {
    return {
        type: settingChange,
        payload: settingsValue
    }
}