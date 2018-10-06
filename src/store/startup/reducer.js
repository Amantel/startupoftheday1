import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

const initialState = Immutable({
    articles: undefined,
    currArticle: undefined
});
const stopWords =
[
  'https://docs.google.com/spreadsheets/d/1LGn1-adzc2lTvOPYY0Stq64nil_lkNf4pzlf3nm_yww/',
  '(На правах рекламы)'
];

function clearStopWords (articles) {
  return articles.filter(article=>{
    let isStoped = false;
    stopWords.forEach(stopWord=>{
      if(article.content
        && article.content.indexOf(stopWord)>-1) isStoped = true;
    });
    if(isStoped) return false;
    return true;
  });

}

function saveArticlesToStorage(articles) {
  let original = getArticlesFromStorage();

  let result = _.unionBy(articles, original, "guid");
  result = clearStopWords(result);
  localStorage.setItem('startupOfTheDayArticles', JSON.stringify(result));
}
function getArticlesFromStorage() {
  let articles = [];
  let localStorageArticles = localStorage.getItem('startupOfTheDayArticles');
  if(localStorageArticles!=null)
    articles = JSON.parse(localStorageArticles);
  articles = clearStopWords(articles);
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
              let isFav = false;
              if(state.user && state.user.favorites.indexOf(articles[0].guid)!==-1) {
                isFav = true;
              }
              return {
                  articles: articles,
                  currArticle:articles[0],
                  articleNumber:0,
                  fromMemory:false,
                  user:state.user,
                  isFav:isFav
              };
            }
            case types.ARTICLES_FETCHED_FROM_MEMORY: {
              let articles = clearStopWords(action.articles);
              let isFav = false;
              if(state.user && state.user.favorites.indexOf(articles[0].guid)!==-1) {
                isFav = true;
              }
              return {
                  articles: articles,
                  currArticle:articles[0],
                  articleNumber:0,
                  fromMemory:true,
                  user:state.user,
                  isFav:isFav
              };
            }
            case "PREV": {
              let articleNumber = Math.min(state.articleNumber + 1,state.articles.length-1);

              let isFav = false;
              if(state.user && state.user.favorites.indexOf(state.articles[articleNumber].guid)!==-1) {
                isFav = true;
              }
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[articleNumber],
                  articleNumber:articleNumber,
                  fromMemory:state.fromMemory,
                  user:state.user,
                  isFav:isFav

              };
              return newState;
            }
            case "NEXT": {
              let articleNumber = Math.max(state.articleNumber - 1,0);

              let isFav = false;
              if(state.user && state.user.favorites.indexOf(state.articles[articleNumber].guid)!==-1) {
                isFav = true;
              }
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[articleNumber],
                  articleNumber:articleNumber,
                  fromMemory:state.fromMemory,
                  user:state.user,
                  isFav:isFav
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
                  isFav:false

              };
              return newState;
            }
            case types.USER_LOADED: {
              let isFav = false;
              if(state.currArticle && action.user && action.user.favorites.indexOf(state.currArticle.guid)!==-1) {
                isFav = true;
              }

              let newState = {
                articles: state.articles,
                currArticle:state.currArticle,
                selectedArticle:state.selectedArticle,
                articleNumber:state.articleNumber,
                fromMemory:state.fromMemory,
                isFav:isFav,
                user:action.user,
              }
              return newState;
            }
            case "SAVE_TO_FAVORITES": {
              let favs = new Set(state.user.favorites);
              let user = state.user;
              favs.add(action.guid);

              user.favorites = Array.from(favs);
              localStorage.setItem('startupOfTheDayUser', JSON.stringify(user));

              let newState = {
                articles: state.articles,
                currArticle:state.currArticle,
                selectedArticle:state.selectedArticle,
                articleNumber:state.articleNumber,
                fromMemory:state.fromMemory,
                isFav:true,
                user:user,
                doNotScroll:true,
              }
              return newState;
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
export function isFav(state) {
    return state.startup.isFav;
}
export function doNotScroll(state) {
    return state.startup.doNotScroll || false;
}
