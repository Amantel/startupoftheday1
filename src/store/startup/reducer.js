import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

const initialState = Immutable({
    articles: undefined,
    currArticle: undefined
});


function saveArticlesToStorage(articles) {
  localStorage.setItem('startupOfTheDayArticles', JSON.stringify(articles));
}
function getArticlesFromStorage() {
  let articles = [];
  let localStorageArticles = localStorage.getItem('startupOfTheDayArticles');
  if(localStorageArticles!=null)
    articles = JSON.parse(localStorageArticles);
  return articles;
}

function findArticleByGUID(guid,state) {
  if(!state.articles || state.articles.length === 0) return undefined;
  let match = _.find(state.articles, { 'guid': guid});
  return match;
}

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
            case types.ARTICLES_FETCHED: {
              saveArticlesToStorage(action.articles);
              let articles = getArticlesFromStorage();
              //getArticlesFromMemory
              return {
                  articles: articles,
                  currArticle:articles[0],
                  articleNumber:0,
                  fromMemory:false,
                  user:state.user,
              };
            }
            case types.ARTICLES_FETCHED_FROM_MEMORY: {
              return {
                  articles: action.articles,
                  currArticle:action.articles[0],
                  articleNumber:0,
                  fromMemory:true,
                  user:state.user,
              };
            }
            case "PREV": {
              let articleNumber = Math.min(state.articleNumber + 1,state.articles.length-1);
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[articleNumber],
                  articleNumber:articleNumber,
                  fromMemory:state.fromMemory,
                  user:state.user,
              };
              return newState;
            }
            case "NEXT": {
              let articleNumber = Math.max(state.articleNumber - 1,0);
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[articleNumber],
                  articleNumber:articleNumber,
                  fromMemory:state.fromMemory,
                  user:state.user,
              };
              return newState;
            }
            case "GOTO": {
              let selectedArticle = findArticleByGUID(action.guid,state);
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[0],
                  selectedArticle:selectedArticle,
                  articleNumber:state.articleNumber,
                  fromMemory:state.fromMemory,
                  user:state.user,
              };
              return newState;
            }
            case types.USER_LOADED: {
              state.user = action.user;
              return state;
            }
            case "SAVE_TO_FAVORITES": {
              let favs = new Set(state.user.favorites);
              favs.add(action.guid);

              state.user.favorites = Array.from(favs);
              localStorage.setItem('startupOfTheDayUser', JSON.stringify(state.user));

              return state;
            }
        default:
            return state;
    }
}

export function getArticlesContent(state) {
    return state.startup.articles;
}
export function getCurrArticleContent(state) {
    return state.startup.currArticle;
}
export function isFromMemory(state) {
    return state.startup.fromMemory;
}
export function getSelectedArticle(state) {
    return state.startup.selectedArticle;
}
export function getCurrArticleNumber(state) {
    return state.startup.articleNumber;
}
export function getUser(state) {
    return state.startup.user;
}
