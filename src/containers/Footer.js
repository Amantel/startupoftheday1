import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './Footer.css'
import Cookies from '../services/Cookies';

class Footer extends Component {

    render() {
        return (
            <UI.Div className="footer">
                <UI.Button level="3" component="a"
                           href="http://startupoftheday.ru/">Сайт</UI.Button>
                <UI.Button level="3" component="a" onClick={this.openAbout.bind(this)}>О
                    сервисе</UI.Button>
                <UI.Button level="3" component="a" onClick={this.openList.bind(this)}>Список</UI.Button>

                <UI.Button level="buy" component="a" onClick={this.clearCookie}>
                        DELETE COOKIES</UI.Button>


            </UI.Div>
        );
    }

    openAbout() {
        this.props.dispatch(push('/about'));
    }

    openList() {
        this.props.dispatch(push('/list'));
    }

    clearCookie() {
      Cookies.deleteCookie('isFirstOpen');
    }
    testIntro() {
        this.props.dispatch(push('/intro'));
    }


}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Footer);
