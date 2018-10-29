import React, { Component } from "react";
import { connect } from "react-redux";
import * as UI from "@vkontakte/vkui";
import "./StartupDashboard.css";
import * as startupSelectors from "../store/startup/reducer";
import * as VKConnect from "@vkontakte/vkui-connect";
import Icon24ShareOutline from "@vkontakte/icons/dist/24/share_outline";
import Icon24FavoriteOutline from "@vkontakte/icons/dist/24/favorite_outline";
import Icon24Favorite from "@vkontakte/icons/dist/24/favorite";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import Icon24BrowserForward from "@vkontakte/icons/dist/24/browser_forward";
//import '../css/App.css';

class StartupDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: false
    };
  }

  getPrettyDate(dateString) {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return (
      ("0" + day).slice(-2) +
      "." +
      ("0" + (month + 1)).slice(-2) +
      "." +
      year.toString().substr(-2)
    );
  }

  componentWillUpdate() {}

  render() {
    if (!this.props.doNotScroll) {
      document
        .querySelector("body")
        .scrollIntoView({ block: "start", behavior: "smooth" });
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

    let last = articleNumber === articles.length - 1;
    let first = articleNumber === 0;

    let date = this.getPrettyDate(article.isoDate);
    let title = "Свежий выпуск";
    if (!first) title = "Выпуск от " + date;
    if (this.props.fromMemory) {
      //title = title + " < FROM LOCAL STORAGE >";
    }
    //
    //maybe we should use https://stackoverflow.com/a/47159227/2863227

    let content = article.content;
    let favClassName = 'social_button';
    let isFavButton = <Icon24FavoriteOutline />;
    if(isFav) {
        favClassName+=" favored ";
        isFavButton = <Icon24Favorite />;
    } else {
      favClassName = 'social_button';
      isFavButton = <Icon24FavoriteOutline />;
    }
    return (
      <UI.Panel id={this.props.id}>
        <UI.PanelHeader>{title}</UI.PanelHeader>

        <UI.Group>
          <UI.Div className="pagen_top_div">
            <UI.Button
              disabled={last}
              level="2"
              className="pagen_button pagen_button_round"
              onClick={this.goPrev.bind(this)}
            >
              {" "}
              <Icon24BrowserBack />
            </UI.Button>

            <UI.Button
              disabled={first}
              level="2"
              className="pagen_button_round"
              style={{ float: "right" }}
              onClick={this.goNext.bind(this)}
            >
              {" "}
              <Icon24BrowserForward />
            </UI.Button>
          </UI.Div>

          <UI.Div
            className="startup_article_content_div"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <hr />
          <UI.Div>
            <UI.Button
              size="l"
              before={
                isFavButton
              }
              className={favClassName}
              level="tertiary"
              onClick={this.saveToFavorites.bind(this, article.guid)}
            />
            <UI.Button
              size="l"
              before={<Icon24ShareOutline />}
              className="social_button"
              level="tertiary"
              style={{ marginRight: 4 }}
              onClick={this.goShare.bind(this)}
            />
          </UI.Div>

          <UI.Div>
            <UI.Button
              disabled={last}
              level="2"
              className="pagen_button pagen_button_round"
              onClick={this.goPrev.bind(this)}
            >
              {" "}
              <Icon24BrowserBack />
            </UI.Button>
            <UI.Button
              disabled={first}
              level="2"
              className="pagen_button_round"
              style={{ float: "right" }}
              onClick={this.goNext.bind(this)}
            >
              {" "}
              <Icon24BrowserForward />
            </UI.Button>
          </UI.Div>
        </UI.Group>
      </UI.Panel>
    );
  }

  goPrev() {
    this.props.dispatch({ type: "PREV" });
  }
  goNext() {
    this.props.dispatch({ type: "NEXT" });
  }
  goShare() {
    let article = this.props.currArticle;
    VKConnect.send("VKWebAppShare", { link: article.guid });
  }
  saveToFavorites(guid) {
    this.props.dispatch({
      type: "SAVE_TO_FAVORITES",
      guid: this.props.currArticle.guid
    });
  }
}

function mapStateToProps(state) {
  return {
    articles: startupSelectors.getArticlesContent(state),
    currArticle: startupSelectors.getCurrArticleContent(state),
    articleNumber: startupSelectors.getCurrArticleNumber(state),
    fromMemory: startupSelectors.isFromMemory(state),
    user: startupSelectors.getUser(state),
    isFav: startupSelectors.isFav(state),
    doNotScroll: startupSelectors.doNotScroll(state)
  };
}

export default connect(mapStateToProps)(StartupDashboard);
