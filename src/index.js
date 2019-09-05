import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {createHashHistory} from 'history';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './store/reducers';
import registerServiceWorker from './registerServiceWorker';
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

import App from './containers/App';

const history = createHashHistory({
    hashType: 'noslash'
});

const logger = store => next => action => {
    //console.log('dispatching', action);
    return next(action);
};

const store = createStore(
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, routerMiddleware(history), logger)
);

const root = document.getElementById('root');
 
// Вызываем хелпер, передавая в аргумент корневой элемент приложения
mVKMiniAppsScrollHelper(root);
let isMobileBrowserClass = '';
if(window.location.href.indexOf("m.vk.com")>-1) isMobileBrowserClass = 'mobile-max-width';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>        
            <div className={isMobileBrowserClass}>
                <Route path='/:pageId(about|intro|content|list|discover|favorite|article|)?' component={(props) => <App pageId={props.match.params.pageId}/>}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    root
);

registerServiceWorker();
