import { PAGE_TYPES } from '../Actions/pageChangedAction';
import { CHANGE_SELECTED_SETTING_ACTION } from '../Actions/changeSelectedSettingAction';


const initialState = {
    selectedSetting: PAGE_TYPES.COLOR_PRESET_SETTINGS
}

export default function changeSelectedSettingReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_SELECTED_SETTING_ACTION: state = { ...state, selectedSetting: payload }; break;
        default: state = { ...state }; break;
    }
    return state;
}