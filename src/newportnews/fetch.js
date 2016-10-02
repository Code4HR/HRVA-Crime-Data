/**
Fetch Sheets
**/
var fs = require('fs');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');

BASE_URL = "http://www2.nngov.com/newport-news/offenses/"
NN_DATA_PATH = '../../data/newportnews/'
FEEDS = [
  "suntxt.htm",
  "montxt.htm",
  "tuetxt.htm",
  "wedtxt.htm",
  "thutxt.htm",
  "fritxt.htm",
  "sattxt.htm"
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
        var dest = NN_DATA_PATH + getDateName(body) + '.html';
        fs.writeFile(dest, body, function (err, data) {
          if (err) {
            return console.log(err);
          }
        });
    })
  })
}

(function run() {
  checkUrls()
})()
