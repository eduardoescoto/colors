export const CHANGE_SELECTED_SETTING_ACTION = "CHANGE_SETTING_ACTION";
export const CHANGE_TEMPORARY_SELECTED_SETTING_ACTION = "CHANGE_TEMPORARY_SELECTED_SETTING_ACTION";

export default function changeSelectedSettingAction(setting) {
    return {
        type: CHANGE_SELECTED_SETTING_ACTION,
        payload: setting
    }
}
export function changeTemporarySelectedSettingAction(setting) {
    return {
        type: CHANGE_TEMPORARY_SELECTED_SETTING_ACTION,
        payload: setting
    }
}