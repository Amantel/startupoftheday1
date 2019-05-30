
import * as Sentry from '@sentry/browser';

let Parser = require('rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

function ResponseError(message, response) {
  this.name = 'responseError';
  this.message = message || 'Default message';
  this.response = response;
  this.stack = (new Error()).stack;
}
ResponseError.prototype = Object.create(Error.prototype);
ResponseError.prototype.constructor = ResponseError;




class Startup {
    async getArticles() {
        return fetch(CORS_PROXY + 'https://startupoftheday.ru/feed/rss/')
            .then(function (response) {
              console.log(response);
              if(response.ok) {
                return response.text();
              }
              throw new ResponseError('fetch error', response);
            }).then(function (text) {
                return parser.parseString(text)
            }).then(function(parsedText){
              return parsedText.items.filter(a=>a.title);
            }).catch(function(error) {

              Sentry.withScope(scope => {

                let key = 'status';
                scope.setExtra(key, error.response[key]);
                key = 'statusText';
                scope.setExtra(key, error.response[key]);
                key = 'url';
                scope.setExtra(key, error.response[key]);

                Sentry.captureException(error.message);
              });

                console.log('There has been a problem with your fetch operation: ' + error.message);
                return [];
            });

    }
}

export default new Startup();
