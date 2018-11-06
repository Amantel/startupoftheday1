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



            </UI.Panel>
        );
    }


}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(IntroPanel);
