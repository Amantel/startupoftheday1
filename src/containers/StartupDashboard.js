import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import './StartupDashboard.css';
import * as startupSelectors from '../store/startup/reducer';
import { colors } from '@vkontakte/vkui';

class StartupDashboard extends Component {

    constructor(props) {
        super(props);
    }

    getPrettyDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }



    render() {
      console.log('props',this.props);

        if (!this.props.lastArticle) {
            return (<UI.Div/>);
        }
        if (!this.props.lastArticle.article) {
            return (<UI.Div/>);
        }
        let article = this.props.lastArticle.article;
        //let date = this.getPrettyDate(article.isoDate);
        //maybe we should use https://stackoverflow.com/a/47159227/2863227
        let content = article.content;
        return (
          <UI.Div className="startup_article_content_div">
          <div  dangerouslySetInnerHTML={{ __html: content }} />
          </UI.Div>


        );
    }
}

function mapStateToProps(state) {
    return {
        lastArticle: startupSelectors.getLastArticleContent(state),
    };
}

export default connect(mapStateToProps)(StartupDashboard);
