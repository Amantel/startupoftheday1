import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
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

                <UI.Group className="no-select-gtitle" title="Этот блог на других площадках">
                            <UI.Link target="_blank" href="https://t.me/startupoftheday/"><UI.CellButton>
                              Telegram
                            </UI.CellButton>
                            </UI.Link>
                            <UI.Link target="_blank" href="https://www.facebook.com/gornal/">
                              <UI.CellButton className="topGreyBorder">
                                Facebook
                              </UI.CellButton>
                            </UI.Link>
                            <UI.Link target="_blank" href="https://icq.com/chat/startups">
                              <UI.CellButton className="topGreyBorder">
                                ICQ
                              </UI.CellButton>
                            </UI.Link>
                            <UI.Link target="_blank" href="https://vk.com/startupoftheday">
                              <UI.CellButton className="topGreyBorder">
                                Группа Вконтакте
                              </UI.CellButton>
                            </UI.Link>
                            <UI.Link target="_blank" href="http://startupoftheday.ru">
                              <UI.CellButton className="topGreyBorder">
                                startupoftheday.ru
                              </UI.CellButton>
                            </UI.Link>



                </UI.Group>
                <UI.Footer className="no-select">Версия 1.0.39</UI.Footer>

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
