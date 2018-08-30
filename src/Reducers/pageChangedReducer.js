import { PAGE_TYPES, CHANGE_PAGE, CHANGE_SIDER_COLLAPSE } from '../Actions/pageChangedAction';
const defaultState = {
    currentPage: PAGE_TYPES.HOME,
    siderCollapsed: false
}
function getPageKeyFromCurrentPage(currentPage) {
    let pageKey;
    if (currentPage && typeof (currentPage) === "string") {
        switch (true) {
            case currentPage.includes(PAGE_TYPES.RGB_SETTINGS): pageKey = PAGE_TYPES.RGB_SETTINGS; break;
            case currentPage.includes(PAGE_TYPES.HEX_SETTINGS): pageKey = PAGE_TYPES.HEX_SETTINGS; break;
            case currentPage.includes(PAGE_TYPES.HSL_SETTINGS): pageKey = PAGE_TYPES.HSL_SETTINGS; break;
            case currentPage.includes(PAGE_TYPES.COLOR_PRESET_SETTINGS): pageKey = PAGE_TYPES.COLOR_PRESET_SETTINGS; break;
            case currentPage.includes(PAGE_TYPES.SETTINGS): pageKey = PAGE_TYPES.SETTINGS; break;
            case currentPage.includes(PAGE_TYPES.HOME): pageKey = PAGE_TYPES.HOME; break;
            default: pageKey = PAGE_TYPES.HOME; break;
        }
    }
    return pageKey;
}
export default function pageChangedReduder(state = defaultState, { type, payload }) {
    switch (type) {
        case CHANGE_SIDER_COLLAPSE: state = { ...state, siderCollapsed: payload }; break;
        case CHANGE_PAGE: const pageKey = getPageKeyFromCurrentPage(payload); state = { ...state, currentPage: pageKey }; break;
        default: state = { ...state }; break;
    }
    return state;
}