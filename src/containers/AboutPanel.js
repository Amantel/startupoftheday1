import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import PhotoImg from '../gorniy_big.png';
import Cookies from '../services/Cookies';
import './StartupDashboard.css';
import AboutContent from './AboutContent';



class AboutPanel extends Component {

    render() {
        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    О Сервисе
                </UI.PanelHeader>
                <AboutContent/>

                <UI.Group title="Этот блог на других площадках">
                          <UI.CellButton>
                            <UI.Link href="https://t.me/startupoftheday/">Telegram</UI.Link>
                          </UI.CellButton>

                          <UI.CellButton className="topGreyBorder">
                            <UI.Link href="https://www.facebook.com/gornal/">Facebook</UI.Link>
                          </UI.CellButton>
                </UI.Group>
            </UI.Panel>
        );

          /*
          <UI.Group title="TMP CONTROLS" className="hidden" >
            <UI.Div>
              <UI.Button level="buy" component="a" onClick={this.clearCookie}>
                    DELETE COOKIES</UI.Button>
              <UI.Button level="buy" component="a" onClick={this.clearStorage}>
                          CLEAR STORAGE</UI.Button>
                          </UI.Div>
          </UI.Group>
          */

    }


    clearCookie() {
      Cookies.deleteCookie('isFirstOpen');
    }
    clearStorage() {
      localStorage.clear();
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AboutPanel);
