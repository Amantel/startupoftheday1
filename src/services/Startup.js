let Parser = require('rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Startup {
    async getArticles() {
        return fetch(CORS_PROXY + 'http://startupoftheday.ru/feed/rss')
            .then(function (response) {
              console.log(response);
              if(response.ok) {
                return response.text();
              }
              throw new Error('Network response was not ok.');

            }).then(function (text) {
                return parser.parseString(text)
            }).then(function(parsedText){
              return parsedText.items.filter(a=>a.title);
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                return [];
            });

    }
}

export default new Startup();
