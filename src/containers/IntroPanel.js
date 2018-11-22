import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import './StartupDashboard.css';
import AboutContent from './AboutContent';



class IntroPanel extends Component {

    render() {

        return (
            <UI.Panel id={this.props.id}>
              <UI.PanelHeader>
                  Стартап дня
              </UI.PanelHeader>

              <AboutContent showButton='1'/>
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


            </UI.Panel>
        );
    }


}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(IntroPanel);
