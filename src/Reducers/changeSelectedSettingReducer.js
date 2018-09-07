import { PAGE_TYPES } from '../Actions/pageChangedAction';
import {
    CHANGE_SELECTED_SETTING_ACTION,
    CHANGE_TEMPORARY_SELECTED_SETTING_ACTION
} from '../Actions/changeSelectedSettingAction';


const initialState = {
    selectedSetting: PAGE_TYPES.COLOR_PRESET_SETTINGS,
    temporarySelectedSetting: PAGE_TYPES.COLOR_PRESET_SETTINGS
}

export default function changeSelectedSettingReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_TEMPORARY_SELECTED_SETTING_ACTION: state = payload ? { ...state, temporarySelectedSetting: payload } : { ...state }; break;
        case CHANGE_SELECTED_SETTING_ACTION: state = { ...state, temporarySelectedSetting: payload, selectedSetting: payload }; break;
        default: state = { ...state }; break;
    }
    return state;
}