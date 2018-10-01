import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import './StartupDashboard.css';
import * as startupSelectors from '../store/startup/reducer';
//import Swipe from 'react-easy-swipe';
import * as VKConnect from '@vkontakte/vkui-connect';


//import { colors } from '@vkontakte/vkui';

class StartupDashboard extends Component {
/*
    constructor(props) {
        super(props);
    }
*/
    getPrettyDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }


    onSwipeLeft(event) {
      this.props.dispatch({ type: 'NEXT' });
    }
    onSwipeRight(event) {
      this.props.dispatch({ type: 'PREV' });
    }



    render() {
        document.querySelector('body').scrollIntoView({ block: 'start', behavior: 'smooth' });


        if (!this.props.articles) {
            //here will be the loader
            return (
              <UI.Group title="Загрузка...">
                <UI.Div style={{ height: 100 }}>
                  <UI.Spinner size={50} />
                </UI.Div>
              </UI.Group>
            );
        }

        let articles = this.props.articles;
        let article = this.props.currArticle;
        let articleNumber = this.props.articleNumber;

        let last = articleNumber === articles.length-1;
        let first = articleNumber === 0;

        let date = this.getPrettyDate(article.isoDate);
        let title = "Свежий выпуск";
        if(!first) title = "Выпуск от "+date;
        //
        //maybe we should use https://stackoverflow.com/a/47159227/2863227
/*            <Swipe
               onSwipeLeft={this.onSwipeLeft.bind(this)}
               onSwipeRight={this.onSwipeRight.bind(this)}>
...
</Swipe>
*/



        let content = article.content;
        return (
          <UI.Group title={title}>



            <UI.Div>
              <UI.Div className="pagen_top_div">
                <UI.Button  disabled={last} level="2"  className="pagen_button" onClick={this.goPrev.bind(this)}>Назад</UI.Button>

                <UI.Button disabled={first} level="2" style={{float:'right'}} onClick={this.goNext.bind(this)}>Вперёд</UI.Button>
              </UI.Div>

                <UI.Div className="startup_article_content_div">
                  <div  dangerouslySetInnerHTML={{ __html: content }} />
                </UI.Div>

                <UI.Div style={{display: 'flex'}}>
                      <UI.Button level="1" stretched className="" onClick={this.goShare.bind(this)}>
                      Отправить другу</UI.Button>
                </UI.Div>


              <UI.Div>
                <UI.Button  disabled={last} level="2" className="pagen_button" onClick={this.goPrev.bind(this)}>Назад</UI.Button>
                <UI.Button disabled={first} level="2" style={{float:'right'}} onClick={this.goNext.bind(this)}>Вперёд</UI.Button>
              </UI.Div>

            </UI.Div>

          </UI.Group>

        );
    }

    goPrev() {
      this.props.dispatch({ type: 'PREV' });
    }
    goNext() {
      this.props.dispatch({ type: 'NEXT' });
    }
    goShare() {
        let article = this.props.currArticle;
        VKConnect.send("VKWebAppShare", {"link":article.guid});
    }


}

function mapStateToProps(state) {
    return {
        articles: startupSelectors.getArticlesContent(state),
        currArticle: startupSelectors.getCurrArticleContent(state),
        articleNumber:startupSelectors.getCurrArticleNumber(state),
    };
}

export default connect(mapStateToProps)(StartupDashboard);
