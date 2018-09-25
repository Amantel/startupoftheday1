import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {isWebView} from '@vkontakte/vkui/src/lib/webview';
import * as vkSelectors from '../store/vk/reducer';
import * as vkActions from '../store/vk/actions';
import AboutPanel from './AboutPanel';
import IntroPanel from './IntroPanel';
import ListPanel from './ListPanel';
import MainPanel from './MainPanel';
import Cookies from '../services/Cookies';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = { isFirst: undefined } ;
    }
    componentWillMount() {
        this.props.dispatch(vkActions.initApp());
        //this.props.dispatch(vkActions.fetchAccessToken()); //this will ask for profile
        let cookie = Cookies.getCookie('isFirstOpen');
        let isFirst = false;
        if(!cookie) {
            cookie = 1;
            isFirst = true;
            Cookies.setCookie('isFirstOpen',cookie,3600000);
            this.setState({ isFirst });
            //this.props.dispatch(push('/intro'));
        }
    }



    render() {


        let activePanel =   'mainPanel';
        //first launch

        if( this.state.isFirst ) {
          activePanel = 'introPanel';
        }


        if(this.props.pageId === 'about') activePanel = 'aboutPanel';
        if(this.props.pageId === 'intro') activePanel = 'introPanel';
        if(this.props.pageId === 'content') activePanel = 'mainPanel';
        if(this.props.pageId === 'list') activePanel = 'listPanel';

        return (
            <UI.ConfigProvider insets={this.props.insets} isWebView={isWebView}>
                <UI.Root activeView="mainView">
                    <UI.View id="mainView" activePanel={activePanel}>
                        <AboutPanel id="aboutPanel"/>
                        <IntroPanel id="introPanel"/>
                        <ListPanel id="listPanel"/>
                        <MainPanel id="mainPanel" accessToken={this.props.accessToken}/>
                        

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
