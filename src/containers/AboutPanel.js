import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Footer from './Footer';
import PhotoImg from '../gorniy.jpg';

const styles = {
  photo_image: {
   float: 'left',
   padding: '10px'
  }
}

class AboutPanel extends Component {

    render() {
        const osname = UI.platform();

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader
                    left={<UI.HeaderButton style={styles.photo_image} onClick={this.navigationBack.bind(this)}>{osname === UI.IOS ?
                        <Icon28ChevronBack/> : <Icon24Back/>}</UI.HeaderButton>}
                >
                    О Сервисе
                </UI.PanelHeader>
                <UI.Group title="Описание">
                    <UI.Div>
                    <img width={96} height={96} src={PhotoImg} alt="Александр Горный"/>

                    Меня зовут Александр Горный, я директор по стратегии и анализу в Mail.Ru Group.
                    </UI.Div>
                    <UI.Div>
                    Я пишу каждый день про один новый малоизвестный стартап и иногда свои мысли и новости про рынок.
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
                <Footer/>
            </UI.Panel>
        );
    }

    navigationBack() {
        this.props.dispatch(goBack());
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AboutPanel);
