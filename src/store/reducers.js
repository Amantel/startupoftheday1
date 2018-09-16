import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import startup from './startup/reducer';
import vk from './vk/reducer';

export const rootReducer = combineReducers({
    startup: startup,
    vk: vk,
    router: routerReducer,
});
