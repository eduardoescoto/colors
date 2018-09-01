export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_SIDER_COLLAPSE = "CHANGE_SIDER_COLLAPSE";

export const PAGE_TYPES = {
    HOME: "colors",
    SETTINGS: "settings",
    RGB_SETTINGS: "rgbSettings",
    HSL_SETTINGS: "hslSettings",
    HEX_SETTINGS: "hexSettings",
    COLOR_PRESET_SETTINGS: "colorPresetSettings"
}

export function changeSiderCollapseAction(collapsed) {
    return {
        type: CHANGE_SIDER_COLLAPSE,
        payload: collapsed
    }
}

export function changePageAction(page) {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}