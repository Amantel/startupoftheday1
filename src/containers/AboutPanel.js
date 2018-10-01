import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import PhotoImg from '../gorniy.jpg';
import Cookies from '../services/Cookies';

const styles = {
  photo_image: {
   float: 'left',
   padding: '20px',
 },
  intro_group: {
    minHeight:'160px'
  }
}

class AboutPanel extends Component {

    render() {
        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    О Сервисе
                </UI.PanelHeader>
                <UI.Group title="Описание" >
                    <UI.Div style={styles.intro_group}>
                    <img width={100} style={styles.photo_image} height={100} src={PhotoImg} alt="Александр Горный"/>

                    <p>
                        Я пишу каждый день про один новый малоизвестный стартап и иногда свои мысли и новости про рынок.
                    </p>
                    <p>
                      Меня зовут Александр Горный, я директор по стратегии и анализу в Mail.Ru Group.
                    </p>
                    </UI.Div>
                </UI.Group>
                <UI.Group title="Этот блог на других площадках">
                    <UI.List>
                        <UI.ListItem multiline>
                          <UI.Link href="https://t.me/startupoftheday/">Telegram</UI.Link>
                        </UI.ListItem>
                        <UI.ListItem multiline>
                        <UI.Link href="https://www.facebook.com/gornal/">Facebook</UI.Link>
                        </UI.ListItem>
                    </UI.List>
                </UI.Group>
                <UI.Group title="TMP CONTROLS">
                  <UI.Div>
                    <UI.Button level="buy" component="a" onClick={this.clearCookie}>
                          DELETE COOKIES</UI.Button>
                    <UI.Button level="buy" component="a" onClick={this.clearStorage}>
                                CLEAR STORAGE</UI.Button>
                                </UI.Div>
                </UI.Group>
            </UI.Panel>
        );
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
