import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import * as startupSelectors from '../store/startup/reducer';
import {push} from 'react-router-redux';

class ListPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: '', foundArticles: [], isFiltered:false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value});
    function doSearch(thisG,searchValue) {
      console.log('searching',searchValue);
      let storedArticles = thisG.props.articles || [];
      let foundArticles = [];

      if(searchValue.length<5) {
          thisG.setState({foundArticles: [], isFiltered:false});

          return false;
      }

      let searchValueRegex = new RegExp(searchValue,"gi");

      if(storedArticles.length>0) {
        foundArticles = storedArticles.filter(article=>{
          if(article.content
            && article.content.search(searchValueRegex)>-1) return true;
          return false;
        });
      }
      console.log(foundArticles);
      thisG.setState({foundArticles: foundArticles, isFiltered:true});


    }

    doSearch(this,e.target.value);
  }

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
        if(this.state.isFiltered) {
          articles = this.state.foundArticles;
        }

        //let date = this.getPrettyDate(article.isoDate);
        let thisPanel = this;
//                        <UI.CellButton onClick={thisPanel.goToArticle.bind(thisPanel,article.guid)}>{article.title}</UI.CellButton>
//
        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Список статей
                </UI.PanelHeader>
                <UI.Group >
                  <UI.FormLayout>
                      <UI.FormLayoutGroup bottom="4 и более символов">
                        <UI.Input   value={this.state.searchValue} onChange={this.handleChange} type="text" placeholder="Поиск статьи..." />
                      </UI.FormLayoutGroup>
                    </UI.FormLayout>
                </UI.Group >
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
    };
}


export default connect(mapStateToProps)(ListPanel);
