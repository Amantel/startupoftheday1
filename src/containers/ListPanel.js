import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import * as startupSelectors from '../store/startup/reducer';
import * as startupActions from '../store/startup/actions';
import {push} from 'react-router-redux';

class ListPanel extends Component {
    getPrettyDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }
    componentWillMount() {
      if(!this.props.articles) {
        const hasChanged = false;
        let storedArticles = [];
        if(localStorage.getItem('startupOfTheDayArticles')!=null) {
          storedArticles = JSON.parse(localStorage.getItem('startupOfTheDayArticles'));
        }

        if(!hasChanged && storedArticles.length!==0) {
          this.props.dispatch(startupActions.fetchArticlesFromMemory());
        } else {
          this.props.dispatch(startupActions.fetchArticles());
        }
      }
    }

    render() {
        if (!this.props.articles) {
            return (
                <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Список свежих статей
                </UI.PanelHeader>
                  <UI.Group title="Загрузка...">
                    <UI.Div style={{ height: 100 }}>
                      <UI.Spinner size={50} />
                    </UI.Div>
                  </UI.Group>
                </UI.Panel>
            );
        }

        let articles = this.props.articles;

        //let date = this.getPrettyDate(article.isoDate);
        let thisPanel = this;

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Список свежих статей
                </UI.PanelHeader>
                {articles.map(function(article, index){
                    let date = thisPanel.getPrettyDate(article.isoDate);
                      return <UI.Group title={date} key={article.guid}>
                        <UI.CellButton onClick={thisPanel.goToArticle.bind(thisPanel,article.guid)}>{article.title}</UI.CellButton>
                      </UI.Group>;

                })}

                <UI.Footer>{articles.length} статей</UI.Footer>

            </UI.Panel>
        );
    }
    goToArticle(guid) {
        this.props.dispatch(
          {type:"GOTO",guid:guid}
        );
        this.props.dispatch(push('/article'));
    }

}

function mapStateToProps(state) {
    return {
        articles: startupSelectors.getArticlesContent(state),
    };
}


export default connect(mapStateToProps)(ListPanel);
