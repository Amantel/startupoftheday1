import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PhotoImg from '../gorniy.jpg';


const styles = {
  photo_image: {
   float: 'left',
   padding: '20px',
   borderRadius:100,
   marginBottom: 30
 },
  intro_group: {
    minHeight:'160px'
  }
}

class IntroPanel extends Component {

    render() {

        return (
            <UI.Panel id={this.props.id}>
            <UI.PanelHeader>
                Стартап дня
            </UI.PanelHeader>

                <UI.Group>
                    <UI.Div style={styles.intro_group}>
                    <img width={100} style={styles.photo_image} height={100} src={PhotoImg} alt="Александр Горный"/>

                    <p>
                        Я пишу каждый день про один новый малоизвестный стартап и иногда свои мысли и новости про рынок.
                    </p>
                    <p>
                      Меня зовут Александр Горный, я директор по стратегии и анализу в Mail.Ru Group.
                    </p>
                    </UI.Div>
                    <UI.Div style={{display: 'flex'}}>
                      <UI.Button size="l" stretched level="1" onClick={this.navigationRead.bind(this)}>Читать</UI.Button>
                    </UI.Div>

                </UI.Group>
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
