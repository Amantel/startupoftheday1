import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import * as startupSelectors from '../store/startup/reducer';
import {push} from 'react-router-redux';







class ListPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {searchValue: props.search || '', foundArticles: [], isFiltered:false};

    this.handleChange = this.handleChange.bind(this);

    console.log('constructed');

  }

  componentDidMount () {
    console.log('onLoad',this.props.search)
    if(this.props.search) {
      this.handleChange(this.props.search);
    }
  }

  handleChange (search) {
    this.setState({searchValue: search});
    function doSearch(thisG,searchValue) {
      console.log('searching',searchValue);
      let storedArticles = thisG.props.articles || [];
      let foundArticles = [];

      if(searchValue.length<2) {
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
    this.props.dispatch(
      {type:"SEARCH",search}
    );
    doSearch(this,search);
  }

    getPrettyDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }


/*
    onChange (search) {
      console.log(search);
      this.setState({ search }); }
*/

    render() {




        if (!this.props.articles) {
            return (
                <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Список статей
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




        //const osname = platform();
        let searchText = this.state.searchValue;

        //let date = this.getPrettyDate(article.isoDate);
        let thisPanel = this;

//
        return (
            <UI.Panel id={this.props.id}>
            <UI.PanelHeader>
              Список статей
            </UI.PanelHeader>

              <UI.Search
              className="searchCustom"
               theme="default"
               value={searchText}
               onChange={this.handleChange.bind(this)}
             />
                {articles.map(function(article, index){
                    let date = thisPanel.getPrettyDate(article.isoDate);
                      return <UI.Group  title={date} className="groupList no-select-gtitle" key={article.guid}>
                        <UI.Div className="listDiv" onClick={thisPanel.goToArticle.bind(thisPanel,article.guid)}>{article.title}</UI.Div>
                      </UI.Group>;

                })}

                <UI.Footer className="no-select">Всего статей: {articles.length} </UI.Footer>

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
        search:state.startup.search || "",
    };
}


export default connect(mapStateToProps)(ListPanel);
