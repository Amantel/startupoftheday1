let Parser = require('rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Startup {
    async getLastArticle() {
        return fetch(CORS_PROXY + 'http://startupoftheday.ru/feed/rss')
            .then(function (response) {
              return response.text();
            }).then(function (text) {
                return parser.parseString(text)
            }).then(function(parsedText){
              return {
                article:parsedText.items[0]
              }
            })

    }
}

export default new Startup();
