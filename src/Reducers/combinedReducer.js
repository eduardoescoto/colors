import { combineReducers } from 'redux';
import colorSettingsChangedReducer from './colorSettingsChangedReducer'
import pageChangedReducer from './pageChangedReducer';

export default combineReducers({
    pages: pageChangedReducer,
    colorSettings: colorSettingsChangedReducer
});