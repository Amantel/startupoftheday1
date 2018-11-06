import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import PhotoImg from '../gorniy_big.png';
import Cookies from '../services/Cookies';
import './StartupDashboard.css';
import {push} from 'react-router-redux';


class AboutContent extends Component {

    render() {
        let superThis = this;

        return (
                <UI.Group className="groupOnTop">
                    <div className="photo-div"><UI.Div className="big_photo" style={{backgroundImage: "url(" + PhotoImg + ")"}} /></div>
                    <UI.Div className='intro_group'>Я пишу каждый день про один новый малоизвестный стартап и иногда свои мысли и новости про рынок.</UI.Div>
                    <UI.Div className='intro_group'>Меня зовут Александр Горный, я директор по стратегии и анализу в Mail.Ru Group.</UI.Div>
                    {this.props.showButton &&
                      <UI.Div style={{display: 'flex'}}>
                        <UI.Button size="l" stretched level="2" onClick={this.navigationRead.bind(this)}>Читать</UI.Button>
                      </UI.Div>
                    }
                </UI.Group>
        );
    }
    navigationRead() {
        this.props.dispatch(push('/content'));
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AboutContent);
