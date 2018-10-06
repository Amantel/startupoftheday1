import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import './StartupDashboard.css';
import * as startupSelectors from '../store/startup/reducer';
import * as VKConnect from '@vkontakte/vkui-connect';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';

class StartupDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isFav: false,
        };
    }

    getPrettyDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }



        componentWillUpdate() {
        }


    render() {
        if(!this.props.doNotScroll) {
            document.querySelector('body').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }



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

        let isFav = this.props.isFav || false;
        let articles = this.props.articles;
        let article = this.props.currArticle;
        let articleNumber = this.props.articleNumber;

        let last = articleNumber === articles.length-1;
        let first = articleNumber === 0;

        let date = this.getPrettyDate(article.isoDate);
        let title = "Свежий выпуск";
        if(!first) title = "Выпуск от "+date;
        if(this.props.fromMemory) {
          title = title + " < FROM LOCAL STORAGE >";
        }
        //
        //maybe we should use https://stackoverflow.com/a/47159227/2863227



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
                      <UI.Button level="1" before={<Icon24Favorite/>} disabled={isFav}
                       stretched className="other_buttons"
                      onClick={this.saveToFavorites.bind(this,article.guid)}
                      >    Добавить в избранное</UI.Button>
                      <UI.Button level="1" before={<Icon24Share/>} stretched className="other_buttons"
                       onClick={this.goShare.bind(this)}>
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
    saveToFavorites(guid) {
      this.props.dispatch({ type: 'SAVE_TO_FAVORITES', guid:this.props.currArticle.guid});
    }

}

function mapStateToProps(state) {
    return {
        articles: startupSelectors.getArticlesContent(state),
        currArticle: startupSelectors.getCurrArticleContent(state),
        articleNumber:startupSelectors.getCurrArticleNumber(state),
        fromMemory:startupSelectors.isFromMemory(state),
        user:startupSelectors.getUser(state),
        isFav:startupSelectors.isFav(state),
        doNotScroll:startupSelectors.doNotScroll(state),
    };
}

export default connect(mapStateToProps)(StartupDashboard);
