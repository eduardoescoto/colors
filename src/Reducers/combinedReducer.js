import { combineReducers } from 'redux';

import pageChangedReducer from './pageChangedReducer';
import colorSettingsChangedReducer from './colorSettingsChangedReducer'
import changeSelectedSettingReducer from './changeSelectedSettingReducer';

export default combineReducers({
    pages: pageChangedReducer,
    colorSettings: colorSettingsChangedReducer,
    selectedSetting: changeSelectedSettingReducer
});