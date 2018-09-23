import Cookies from './Cookies';

let Parser = require('rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Startup {
    async getArticles() {
        let cookie = Cookies.getCookie("isFirstOpen");
        if(!cookie) cookie = 0;
        cookie = cookie*1 + 1;
        Cookies.setCookie("isFirstOpen",cookie,3600000);
        return fetch(CORS_PROXY + 'http://startupoftheday.ru/feed/rss')
            .then(function (response) {
              return response.text();
            }).then(function (text) {
                return parser.parseString(text)
            }).then(function(parsedText){
              return parsedText.items
            })

    }
}

export default new Startup();
