import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import * as startupSelectors from '../store/startup/reducer';
import {push} from 'react-router-redux';

class FavoritesPanel extends Component {
    getPrettyDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }
    componentWillMount() {
    }

    render() {
        if (!this.props.articles) {
            return (
                <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Избранное
                </UI.PanelHeader>
                </UI.Panel>
            );
        }

        let articles = [];
        if(this.props.user) {
          articles = this.props.articles.filter(article=>{
            if(article.guid
              && this.props.user.favorites.indexOf(article.guid)!==-1) return true;
            return false;
          });
        }


        //let date = this.getPrettyDate(article.isoDate);
        let thisPanel = this;

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Избранное
                </UI.PanelHeader>
                {articles.map(function(article, index){
                    let date = thisPanel.getPrettyDate(article.isoDate);
                      return <UI.Group title={date} key={article.guid}>
                        <UI.Div className="listDiv" onClick={thisPanel.goToArticle.bind(thisPanel,article.guid)}>{article.title}</UI.Div>
                      </UI.Group>;

                })}

                <UI.Footer>Всего статей: {articles.length} </UI.Footer>

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
        user:startupSelectors.getUser(state),
    };
}


export default connect(mapStateToProps)(FavoritesPanel);
