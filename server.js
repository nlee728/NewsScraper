var cheerio = require("cheerio");
var axios = require("axios");


// Making a request via axios for Huffington Post's Parenting Page. The page's HTML is passed as the callback's third argument
axios.get("https://www.huffpost.com/life/parents").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(response.data);

  // An empty array to save the data that's scraped
  var articles = [];


  $("div.card").each(function(i, element) {

    var title = $(element).children().find("h3.card__headline__text").text();

    var link = $(element).children("a.card__image__link").attr("href");

    var image =  $(element).children().find("img").attr("src");

    var summary =  $(element).children().find("div.card__description").text();

    // Save these results in an object that will be pshed into the articles array
    articles.push({
      title: title,
      link: link,
      image:image,
      summary:summary
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(articles);
});