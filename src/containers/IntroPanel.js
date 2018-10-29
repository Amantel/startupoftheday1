import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PhotoImg from '../gorniy_big.png';
import './StartupDashboard.css';
import AboutContent from './AboutContent';



class IntroPanel extends Component {

    render() {

        return (
            <UI.Panel id={this.props.id}>
            <UI.PanelHeader>
                Стартап дня
            </UI.PanelHeader>

            <AboutContent/>

            </UI.Panel>
        );
    }

    navigationRead() {
        this.props.dispatch(push('/content'));
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(IntroPanel);
