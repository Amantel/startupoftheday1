import React, { Component } from "react";
import * as UI from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { connect } from "react-redux";
import * as startupSelectors from "../store/startup/reducer";
import { goBack } from "react-router-redux";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24ShareOutline from "@vkontakte/icons/dist/24/share_outline";
import Icon24FavoriteOutline from "@vkontakte/icons/dist/24/favorite_outline";
import Icon24Favorite from "@vkontakte/icons/dist/24/favorite";

import "./StartupDashboard.css";
import * as VKConnect from "@vkontakte/vkui-connect";

class ArticlePanel extends Component {
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

  render() {
    const osname = UI.platform();

    if (!this.props.doNotScroll) {
      document
        .querySelector("body")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    }

    if (!this.props.selectedArticle) {
      return (
        <UI.Panel id={this.props.id}>
          <UI.PanelHeader
            left={
              <UI.HeaderButton onClick={this.navigationBack.bind(this)}>
                {osname === UI.IOS ? <Icon28ChevronBack /> : <Icon24Back />}
              </UI.HeaderButton>
            }
          >
            Статья
          </UI.PanelHeader>

          <UI.Group title="Нет статьи" />
        </UI.Panel>
      );
    }

    let article = this.props.selectedArticle;

    let isFav = this.props.isFav || false;

    let date = this.getPrettyDate(article.isoDate);
    let title = "Выпуск от " + date;
    if (this.props.fromMemory) {
      //  title = title + " < FROM LOCAL STORAGE >";
    }
    //
    //maybe we should use https://stackoverflow.com/a/47159227/2863227

    let content = article.content;

    let favClassName = 'social_button';
    let isFavButton = <Icon24FavoriteOutline />;

    if (isFav) {
      favClassName += " favored ";
      isFavButton = <Icon24Favorite />;
    } else {
      favClassName = "social_button";
      isFavButton = <Icon24FavoriteOutline />;
    }

    return (
      <UI.Panel id={this.props.id}>
        <UI.PanelHeader
          left={
            <UI.HeaderButton onClick={this.navigationBack.bind(this)}>
              {osname === UI.IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </UI.HeaderButton>
          }
        >
          {title}
        </UI.PanelHeader>
        <UI.Group>
          <UI.Div className="startup_article_content_div">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </UI.Div>

          <hr />
          <UI.Div>
            <UI.Button
              size="l"
              before={isFavButton}
              activeEffectDelay = '50'
              className={favClassName}
              level="tertiary"
              onClick={this.saveToFavorites.bind(this, article.guid)}
            />
            <UI.Button
              size="l"
              before={<Icon24ShareOutline />}
              className="social_button"
              activeEffectDelay = '50'
              level="tertiary"
              style={{ marginRight: 4 }}
              onClick={this.goShare.bind(this)}
            />
          </UI.Div>
        </UI.Group>
      </UI.Panel>
    );
  }

  navigationBack() {
    this.props.dispatch(goBack());
  }
  goShare() {
    let article = this.props.selectedArticle;
    VKConnect.send("VKWebAppShare", { link: article.guid });
  }
  saveToFavorites(guid) {
    this.props.dispatch({
      type: "SAVE_TO_FAVORITES",
      guid: this.props.selectedArticle.guid
    });
  }
}

function mapStateToProps(state) {
  return {
    selectedArticle: startupSelectors.getSelectedArticle(state),
    user: startupSelectors.getUser(state),
    isFav: startupSelectors.isFav(state),
    doNotScroll: startupSelectors.doNotScroll(state)
  };
}

export default connect(mapStateToProps)(ArticlePanel);
