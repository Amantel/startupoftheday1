import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import PhotoImg from '../gorniy_big.png';
import Cookies from '../services/Cookies';
import './StartupDashboard.css';


class AboutContent extends Component {

    render() {
        return (
                <UI.Group >
                    <UI.Div className="big_photo" style={{backgroundImage: "url(" + PhotoImg + ")"}} />
                    <UI.Div className='intro_group'>Я пишу каждый день про один новый малоизвестный стартап и иногда свои мысли и новости про рынок.</UI.Div>
                    <UI.Div className='intro_group'>Меня зовут Александр Горный, я директор по стратегии и анализу в Mail.Ru Group.</UI.Div>                    
                </UI.Group>
        );
    }

}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AboutContent);
