import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {isWebView} from '@vkontakte/vkui/src/lib/webview';
import * as vkSelectors from '../store/vk/reducer';
import * as vkActions from '../store/vk/actions';
import AboutPanel from './AboutPanel';
import IntroPanel from './IntroPanel';
import MainPanel from './MainPanel';
import Cookies from '../services/Cookies';
import {push} from 'react-router-redux';


class App extends Component {

    componentWillMount() {
        this.props.dispatch(vkActions.initApp());
        //this.props.dispatch(vkActions.fetchAccessToken()); //this will ask for profile
    }



    render() {
      let cookie = Cookies.getCookie('isFirstOpen');
      let isFirst = false;
      console.log('cookie',cookie);
      if(!cookie) {
          isFirst = true;
          cookie = 1;
          Cookies.setCookie('isFirstOpen',cookie,3600000);
          this.props.dispatch(push('/intro'));
      }

        let activePanel =   'mainPanel';
        //first launch
        if( isFirst ) {
          activePanel = 'introPanel';
        }
        console.log('pageID',this.props.pageId);
        if(this.props.pageId === 'about') activePanel = 'aboutPanel';
        if(this.props.pageId === 'intro') activePanel = 'introPanel';

        return (
            <UI.ConfigProvider insets={this.props.insets} isWebView={isWebView}>
                <UI.Root activeView="mainView">
                    <UI.View id="mainView" activePanel={activePanel}>
                        <MainPanel id="mainPanel" accessToken={this.props.accessToken}/>
                        <AboutPanel id="aboutPanel"/>
                        <IntroPanel id="introPanel"/>

                    </UI.View>
                </UI.Root>
            </UI.ConfigProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: vkSelectors.getAccessToken(state),
        insets: vkSelectors.getInsets(state),
    };
}

export default connect(mapStateToProps)(App);
