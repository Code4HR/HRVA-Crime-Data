/**
Fetch Sheets
**/
var fs = require('fs');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');

BASE_URL = "http://www2.nngov.com/newport-news/offenses/"
FEEDS = [
  "suntxt.htm",
  // "montxt.htm",
  // "tuetxt.htm",
  // "wedtxt.htm",
  // "thutxt.htm",
  // "fritxt.htm",
  // "sattxt.htm",
]

function getDateName(dom) {
  $ = cheerio.load(dom, {
      normalizeWhitespace: true,
      xmlMode: true
  });
  const parts = $('h2 center')[0].children[0].data.split(' ');
  let title = parts.pop().replace(/\//g, '_');
  return title
}

function checkUrls() {
  FEEDS.forEach(function(path) {
    console.log(BASE_URL + path)
    request(BASE_URL + path, function(error, res, body) {
        console.log(body);
        // debugger;
        var dest = fs.createWriteStream(getDateName(body) + '.html');
        debugger
        res.pipe(dest);
    })
  })
}

(function run() {
  checkUrls()
})()
