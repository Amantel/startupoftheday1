import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import * as startupSelectors from '../store/startup/reducer';

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {searchValue: '', foundArticles: []};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value});
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


        let foundArticles = this.state.foundArticles;
        let thisPanel = this;

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Поиск
                </UI.PanelHeader>
                <UI.Group >
                  <UI.FormLayout>
                    <UI.FormLayoutGroup bottom="4 и более символов">
                      <UI.Input   value={this.state.searchValue} onChange={this.handleChange} type="text" placeholder="Введите текст для поиска" />
                    </UI.FormLayoutGroup>

                    <UI.FormLayoutGroup>

                        <UI.Button  size="l" level="1" onClick={this.doSearch.bind(this)}>Искать</UI.Button>

                    </UI.FormLayoutGroup>
                  </UI.FormLayout>
                </UI.Group >
                <UI.Group >
                  {foundArticles.map(function(article, index){
                      let date = thisPanel.getPrettyDate(article.isoDate);
                        return <UI.Group title={date} key={article.guid}>
                        <UI.CellButton onClick={thisPanel.goToArticle.bind(thisPanel,article.guid)}>{article.title}</UI.CellButton>
                        </UI.Group>;
                  })}
                </UI.Group >

            </UI.Panel>
        );
    }

    doSearch() {
      console.log('searching',this.state.searchValue);
      let searchValue = this.state.searchValue;
      let storedArticles = this.props.articles || [];
      let foundArticles = [];

      if(searchValue.length<4) return false;
      let searchValueRegex = new RegExp(searchValue,"gi");

      if(storedArticles.length>0) {
        foundArticles = storedArticles.filter(article=>{
          if(article.content
            && article.content.search(searchValueRegex)!==-1) return true;
          return false;
        });
      }

      this.setState({foundArticles: foundArticles});


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


export default connect(mapStateToProps)(SearchPanel);
