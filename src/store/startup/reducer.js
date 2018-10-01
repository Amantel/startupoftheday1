import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    articles: undefined,
    currArticle: undefined
});


function saveArticlesToStorage(articles) {
  localStorage.setItem('startupOfTheDayArticles', JSON.stringify(articles));
}

export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
            case types.ARTICLES_FETCHED: {
              saveArticlesToStorage(action.articles);
              return {
                  articles: action.articles,
                  currArticle:action.articles[0],
                  articleNumber:0,
                  fromMemory:false,
              };
            }
            case types.ARTICLES_FETCHED_FROM_MEMORY: {
              return {
                  articles: action.articles,
                  currArticle:action.articles[0],
                  articleNumber:0,
                  fromMemory:true,
              };
            }
            case "PREV": {
              let articleNumber = Math.min(state.articleNumber + 1,state.articles.length-1);
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[articleNumber],
                  articleNumber:articleNumber,
                  fromMemory:state.fromMemory,
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
              };
              return newState;
            }
            case "GOTO": {
              let articleNumber = action.index;
              let newState = {
                  articles: state.articles,
                  currArticle:state.articles[articleNumber],
                  articleNumber:articleNumber,
                  fromMemory:state.fromMemory,
              };
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

export function getCurrArticleNumber(state) {
    return state.startup.articleNumber;
}
