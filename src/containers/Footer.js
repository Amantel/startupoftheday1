import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './Footer.css'
import Icon24Message from '@vkontakte/icons/dist/24/message';
import Cookies from '../services/Cookies';

class Footer extends Component {

    render() {
        return (
            <UI.Div className="footer">
                <UI.Button level="3" component="a"
                           href="http://startupoftheday.ru/">Сайт</UI.Button>
                <UI.Button level="3" component="a" onClick={this.openAbout.bind(this)}>О
                    сервисе</UI.Button>
                <UI.Button level="danger" component="a" onClick={this.clearCookie}>
                        DELETE COOKIES</UI.Button>
            </UI.Div>
        );
    }

    openAbout() {
        this.props.dispatch(push('/about'));
    }
    clearCookie() {
      Cookies.deleteCookie('isFirstOpen');
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Footer);
