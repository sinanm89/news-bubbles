'use strict';

var NB = NB || {};

NB.StoryModel = (function() {
  var StoryModel = {};

  StoryModel.tooltipStory = {
    name: ko.observable(),
    url: ko.observable(),
    sourceUrl: ko.observable(),
    authorUrl: ko.observable(),
    domain: ko.observable(),
    category: ko.observable(),
    author: ko.observable(),
    commentCount: ko.observable(),
    score: ko.observable(),
    timeString: ko.observable(),
    dateString: ko.observable()
  };

  StoryModel.panelStory = {
    name: ko.observable('News Bubbles'),
    url: ko.observable(),
    sourceUrl: ko.observable(),
    authorUrl: ko.observable(),
    domain: ko.observable(),
    category: ko.observable(),
    author: ko.observable(),
    commentCount: ko.observable(),
    score: ko.observable(),
    timeString: ko.observable(),
    dateString: ko.observable(),
    content: ko.observable('Select a bubble on the left do display its content here.')
  };

  StoryModel.setCurrentStory = function(tooltipOrPanel, story) {
    var storyObj = StoryModel[tooltipOrPanel + 'Story'];
    var dateFormatter = d3.time.format('%a, %-e %b %Y');
    var timeFormatter = d3.time.format('%-I:%M%p');
    var domain
      , url = story.url
      , sourceUrl
      , authorUrl;
    var name = story.name;
    var category = story.category || '';

    if (story.source === 'rd') {
      domain = story.reddit.domain;
      sourceUrl = 'https://www.reddit.com' + story.reddit.permalink;
      authorUrl = 'http://www.reddit.com/user/' + story.author;
    }
    if (story.source === 'hn') {
      sourceUrl = 'https://news.ycombinator.com/item?id=' + story.sourceId;
      authorUrl = 'https://news.ycombinator.com/user?id=' + story.author;
      if (!story.url) {
        url = sourceUrl;
      }
      if (story.name.toLowerCase().indexOf('show hn') > -1) {
        domain = 'Show HN';
        name = name.replace('Show HN: ', '');
      } else if (story.name.toLowerCase().indexOf('ask hn') > -1) {
        domain = 'Ask HN';
        url = sourceUrl
        name = name.replace('Ask HN: ', '');
      } else {
        var urlTest = story.url.match(/:\/\/([^\/]*)/);
        if (urlTest) {
          domain = urlTest[1] ? urlTest[1] : 'HN'; 
        } else {
          domain = 'Hacker News';
        }
      }
    }

    if (tooltipOrPanel === 'tooltip' && name.length > 50) {
      name = name.substr(0, 47).trim() + '...';
    }

//     if (category) {
//       console.log('I have a category:', category, story);
//     }

    storyObj
      .name(name)
      .url(url)
      .sourceUrl(sourceUrl)
      .authorUrl(authorUrl)
      .domain(domain)
      .category(category)
      .author(story.author)
      .commentCount(story.commentCount)
      .score(Math.round(story.score))
      .timeString(timeFormatter(story.postDate))
      .dateString(dateFormatter(story.postDate));

    if (tooltipOrPanel === 'panel') {
        storyObj.content(story.content);
    }
  };


  return StoryModel;
})();