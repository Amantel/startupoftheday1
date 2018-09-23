import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Footer from './Footer';
import PhotoImg from '../gorniy.jpg';


const styles = {
  photo_image: {
   float: 'left',
   padding: '10px'
  }
}

class IntroPanel extends Component {

    render() {

        return (
            <UI.Panel id={this.props.id}>
            <UI.PanelHeader>
                Startup of the day
            </UI.PanelHeader>

                <UI.Group title="Описание">
                    <UI.Div>
                    <img width={96} height={96} style={styles.photo_image} src={PhotoImg} alt="Александр Горный"/>

                    Меня зовут Александр Горный, я директор по стратегии и анализу в Mail.Ru Group.
                    </UI.Div>
                    <UI.Div>
                    Я пишу каждый день про один новый малоизвестный стартап и иногда свои мысли и новости про рынок.
                    </UI.Div>
                    <UI.Div style={{display: 'flex'}}>
                      <UI.Button size="l" stretched level="2" onClick={this.navigationRead.bind(this)}>Читать</UI.Button>
                    </UI.Div>

                </UI.Group>
                <Footer/>
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
