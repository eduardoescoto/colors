export const COLOR_PRESETS_SETTING_CHANGED = "Color Preset Settings"
export const COLOR_PRESETS = {
    REDS: 'Reds',
    PINKS: 'Pinks',
    BLUES: 'Blues',
    GREYS: 'Greys',
    GREENS: 'Greens',
    BLACKS: 'Blacks',
    WHITES: 'Whites',
    PASTELS: 'Pastels',
    ORANGES: 'Oranges',
    PURPLES: 'Purples',
    NEONS: 'Neons'
}

export const VALUE_TYPES = {
    RANGED: "RANGED",
    EXACT: "EXACT"
}

export const SETTINGS_MODE_CHANGED = "All Settings";
export const SETTINGS_MODE = {
    HSL: 'HSL',
    RGB: 'RGB',
    HEX: 'HEX',
    TYPES: 'TYPES'
}

export const HSL_SETTING_CHANGED = "HSL Settings";
export const RGB_SETTING_CHANGED = "RGB Settings";
export const HEX_SETTING_CHANGED = "HEX Settings";



export default function changeSettingAction(settingChange, settingsValue) {
    return {
        type: settingChange,
        payload: settingsValue
    }
}