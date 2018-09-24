let Parser = require('rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Startup {
    async getArticles() {
        return fetch(CORS_PROXY + 'http://startupoftheday.ru/feed/rss')
            .then(function (response) {
              return response.text();
            }).then(function (text) {
                return parser.parseString(text)
            }).then(function(parsedText){
              return parsedText.items.filter(a=>a.title);
            })

    }
}

export default new Startup();
