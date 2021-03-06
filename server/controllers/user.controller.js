'use strict';

var path = require('path')
  , User = require(path.join(__dirname, '..', 'models', 'User.model'))
  , utils = require(path.join(__dirname, '..', 'utils'))
  , devLog = utils.devLog
  , request = require('request')
;


//add this id to the read list for the user
function markAsRead(data) {
  // devLog('will add to read list:', data.userId, 'and', data.storyId);
  var userId = data.userId
    , storyId = data.storyId
  ;
    User.findById(userId, function(err, user) {
    if (err) { return; } //TODO feed back to client
    if (!user) { return; } //perhaps user was deleted in another session? TODO hande better

    var foundMatch = false
      , i
    ;

    if (user.stories) { //older stories won't have this. Can go if I do a DB wipe
      for (i = 0; i < user.stories.length; i++) {
        if (user.stories[i].storyId === storyId) {
          user.stories[i].read = true;
          foundMatch = true;
          break;
        }
      }
    }

    if (!foundMatch) {
      user.stories.push({
        storyId: storyId,
        read: true
      });
    }
    user.save();


  });
  // User.findById(userId, function(err, user) {
  //   if (err) { return; } //TODO feed back to client
  //   if (!user) { return; } //perhaps user was deleted in another session? TODO hande better

  //   if (user.readList.indexOf(storyId) === -1) {
  //     // console.log('Adding', storyId, 'to the list of read things for user', userId);
  //     user.readList.push(storyId);
  //     user.save();
  //   }

  // });
}
//add this id to the read list for the user
function markAsUnread(data) {
  // devLog('will remove from read list:', data.userId, 'and', data.storyId);
  var userId = data.userId
    , storyId = data.storyId
  ;
  User.findById(userId, function(err, user) {
    if (err) { return; } //TODO feed back to client
    if (!user) { return; } //perhaps user was deleted in another session? TODO hande better
    var i;

    if (user.stories) { //older stories won't have this. Can go if I do a DB wipe
      for (i = 0; i < user.stories.length; i++) {
        if (user.stories[i].storyId === storyId) {
          user.stories[i].read = false;
          break;
        }
      }
    }
    user.save();

    // var pos = user.readList.indexOf(storyId);
    // if (pos > -1) {
    //   // devLog('Marking this story as not read:', user.readList[pos]);
    //   user.readList.splice(pos, 1);
    //   user.save();
    // } else {
    //   devLog('No story with id', storyId, 'is in the read list. That is odd.');
    // }

  });
}

function addToFavs(data) {
  //TODO for now I'm adding the entire story to the user object.
  //Eventually just store the ID, then generate the fav list when a user navigates to fav tab.
  // devLog('will add to favs:', data.userId, 'and', data.story.name);
  var userId = data.userId
    , story = data.story
  ;
  User.findById(userId, function(err, user) {
    if (err) { return; } //TODO feed back to client
    if (!user) { return; } //perhaps user was deleted in another session? TODO hande better
    var storyExists = false;
    user.favs.forEach(function(fav) {
      if (fav.id === story.id) { storyExists = true; }
    });
    if (storyExists) {
      return;
    } else {
      user.favs.push(story);
      user.save();
    }

  });
}

function updateSettings(data) {
  var userId = data.userId
    , settings = data.settings
  ;
  User.findById(userId, function(err, user) {
    if (err) { return; } //TODO feed back to client
    if (!user) { return; } //perhaps user was deleted in another session? TODO hande better

    //TODO the settings sent from the client that aren't the schema will be ignored
    //but still, I should be less brutal about what I save here.
    user.settings = settings;
    user.save();
  });

}

function removeFromFavs(data) {
  var userId = data.userId
    , storyId = data.storyId
  ;
  User.findById(userId, function(err, user) {
    if (err) { return; } //TODO feed back to client
    if (!user) { return; } //perhaps user was deleted in another session? TODO hande better
    user.favs.forEach(function(fav, i) {
      if (fav.id === storyId) {
        user.favs.splice(i, 1);
        user.save();
        return;
      }
    });
  });

}

function updateToken(userId, token, done) {
  console.log('updateToken(', userId, token, ')');
  User.findById(userId, function(err, userDoc) {
    console.log('saving for user:', userDoc);
    userDoc.reddit.token = token;
    userDoc.save(function(err) {
      done(err);
    });
  });
}

function rdtVote(req, res) {
}

exports.markAsRead = markAsRead;
exports.markAsUnread = markAsUnread;
exports.addToFavs = addToFavs;
exports.updateSettings = updateSettings;
exports.removeFromFavs = removeFromFavs;
exports.rdtVote = rdtVote;
exports.updateToken = updateToken;

