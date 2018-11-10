import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import * as vkSelectors from '../store/vk/reducer';
import * as vkActions from '../store/vk/actions';
import AboutPanel from './AboutPanel';
import IntroPanel from './IntroPanel';
import ListPanel from './ListPanel';
import FavoritesPanel from './FavoritesPanel';
import MainPanel from './MainPanel';
import ArticlePanel from './ArticlePanel';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28About from '@vkontakte/icons/dist/28/about_outline';
import Icon28More from '@vkontakte/icons/dist/28/more';
import {push} from 'react-router-redux';
import * as startupActions from '../store/startup/actions';
import * as startupSelectors from '../store/startup/reducer';
import '../css/App.css';
import * as Sentry from '@sentry/browser';

class App extends Component {


    constructor (props) {
      super(props);

      Sentry.init({
        dsn: "https://1105bcc9e1684eaa948883d71e07d456@sentry.io/1317630"
      });

      this.state = {
        activeStory: 'feed',
        isFirst: undefined
      };
      this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange (e) {
      window.scrollTo(0, 0);

      this.setState({ activeStory: e.currentTarget.dataset.story });
      this.props.dispatch(push('/'+e.currentTarget.dataset.story));
    }



    componentWillMount() {
        this.props.dispatch(vkActions.initApp());

        let user =  JSON.parse(localStorage.getItem('startupOfTheDayUser'))
        this.props.dispatch(startupActions.loadUser());


        if(!this.props.articles) {
          if(!user)
          {
              this.props.dispatch(startupActions.fetchArticles());
          } else {

            const lastVisit = new Date(user.lastVisit).getTime()/1000/60/60; //hours
            const timeNow = new Date().getTime()/1000/60/60; //hours
            const hasChanged = timeNow - lastVisit > 3; //more than 3 hours


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


        //this.props.dispatch(vkActions.fetchAccessToken()); //this will ask for profile

        let cookie = parseInt(localStorage.getItem('startUpisFirstOpen'),10);
        let isFirst = false;

        if(cookie!==1) {
            cookie = 1;
            isFirst = true;
            localStorage.setItem('startUpisFirstOpen', 1);

            this.setState({ isFirst });
            this.props.dispatch(push('/intro'));
        }
    }


    render () {
      let activeStory = this.state.activeStory;
      if(this.props.pageId === '') activeStory = 'feed';
      if(this.props.pageId === 'content') activeStory = 'feed';
      if(this.props.pageId === 'about') activeStory = 'about';
      if(this.props.pageId === 'intro') activeStory = 'intro';
      if(this.props.pageId === 'article') activeStory = 'article';
      if(this.props.pageId === 'list') activeStory = 'list';
      if(this.props.pageId === 'favorite') activeStory = 'favorite';

      const coutner = `<!-- Rating@Mail.ru counter -->
      <script type="text/javascript">
      var _tmr = window._tmr || (window._tmr = []);
      _tmr.push({id: "2923683", type: "pageView", start: (new Date()).getTime()});
      (function (d, w, id) {
        if (d.getElementById(id)) return;
        var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
        ts.src = "https://top-fwz1.mail.ru/js/code.js";
        var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
        if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
      })(document, window, "topmailru-code");
      </script><noscript><div>
      <img src="https://top-fwz1.mail.ru/counter?id=2923683;js=na" style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" />
      </div></noscript>
      <!-- //Rating@Mail.ru counter -->`;


      var _tmr = window._tmr || (window._tmr = []);
      _tmr.push({ id: "2923683", type: "pageView", url: activeStory });


      //this.setState({ activeStory: activeStory });
      //console.log(activeStory);
      return (
        <span>
          <span dangerouslySetInnerHTML={{ __html: coutner }}    />
          <UI.Epic activeStory={activeStory} tabbar={
            <UI.Tabbar>
              <UI.TabbarItem
                className = "tabItem"
                onClick={this.onStoryChange}
                selected={activeStory === 'feed'}
                data-story="feed"
              ><Icon28Newsfeed /></UI.TabbarItem>
              <UI.TabbarItem
              className = "tabItem"
                onClick={this.onStoryChange}
                selected={this.state.activeStory === 'favorite'}
                data-story="favorite"
              ><Icon28Favorite /></UI.TabbarItem>
              <UI.TabbarItem
              className = "tabItem"
                onClick={this.onStoryChange}
                selected={this.state.activeStory === 'list'}
                data-story="list"
              ><Icon28More /></UI.TabbarItem>
              <UI.TabbarItem
                className = "tabItem"
                onClick={this.onStoryChange}
                selected={this.state.activeStory === 'about'}
                data-story="about"
              ><Icon28About /></UI.TabbarItem>
            </UI.Tabbar>
          }>
            <UI.View id="feed" activePanel="feed">
              <MainPanel id="feed" accessToken={this.props.accessToken}/>
            </UI.View>
            <UI.View id="favorite" activePanel="favorite">
              <FavoritesPanel id="favorite"/>
            </UI.View>
            <UI.View id="list" activePanel="list">
              <ListPanel id="list"/>
            </UI.View>
            <UI.View id="about" activePanel="about">
              <AboutPanel id="about"/>
            </UI.View>
            <UI.View id="intro" activePanel="intro">
              <IntroPanel id="intro"/>
            </UI.View>
            <UI.View id="article" activePanel="article">
              <ArticlePanel id="article"/>
            </UI.View>


          </UI.Epic>
        </span>
      )
    }

}



function mapStateToProps(state) {
    return {
        accessToken: vkSelectors.getAccessToken(state),
        insets: vkSelectors.getInsets(state),
        user:startupSelectors.getUser(state),
    };
}

export default connect(mapStateToProps)(App);
