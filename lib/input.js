
const config = require('./config.js'),
  algo = require('./algorithms.js'),
  async = require('async'),
  Key = require('./key');

const updateSequence = function (userId, itemId, options = {}) {
  let updateWilson = true;
  if ('updateWilson' in options) {
    updateWilson = options.updateWilson ? true : false;
  }

  return new Promise((resolve, reject) => {
    algo.updateSimilarityFor(userId, function () {
      async.parallel([
        function (cb) {
          algo.updateWilsonScore(itemId, function () {
            cb(null);
          });
        },
        function (cb) {
          algo.updateRecommendationsFor(userId, function () {
            cb(null);
          });
        }
      ],
        function (err) {
          if (err) { console.log('error', err); }
          resolve();
        });
    });
  });
};

const changeRating = function (userId, itemId, options) {
  let updateRecommendations = true;
  if ('updateRecs' in options) {
    updateRecommendations = options.updateRecs ? true : false;
  }

  const removeRating = options.removeRating ? true : false;

  let feelingItemSet = options.liked ? Key.itemLikedBySet(itemId) : Key.itemDislikedBySet(itemId);
  let feelingUserSet = options.liked ? Key.userLikedSet(userId) : Key.userDislikedSet(userId);
  let mostFeelingSet = options.liked ? Key.mostLiked() : Key.mostDisliked();

  if (options.visited) {
    feelingItemSet = Key.itemVisitedBySet(itemId);
    feelingUserSet = Key.userVisitedSet(userId);
    mostFeelingSet = Key.mostVisited();
  }

  if (options.polled) {
    feelingItemSet = Key.itemPolledBySet(itemId);
    feelingUserSet = Key.userPolledSet(userId);
    mostFeelingSet = Key.mostPolled();
  }

  if (options.reviewed) {
    feelingItemSet = Key.itemReviewedBySet(itemId);
    feelingUserSet = Key.userReviewedSet(userId);
    mostFeelingSet = Key.mostReviewed();
  }

  if (options.scored) {
    feelingItemSet = Key.itemScoredBySet(itemId);
    feelingUserSet = Key.userScoredSet(userId);
    mostFeelingSet = Key.mostScored();
  }

  if (options.wishlisted) {
    feelingItemSet = Key.itemWishlistedBySet(itemId);
    feelingUserSet = Key.userWishlistedSet(userId);
    mostFeelingSet = Key.mostWishlisted();
  }

  console.log(feelingItemSet, feelingUserSet, mostFeelingSet)


  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      // check if the rating is already stored
      return client.sismemberAsync(feelingItemSet, userId);
    }).then((result) => {
      // only increment the most feeling set if it doesn't already exist
      if (result === 0 && !removeRating) {
        client.zincrby(mostFeelingSet, 1, itemId);
      } else if (result > 0 && removeRating) {
        client.zincrby(mostFeelingSet, -1, itemId);
      }
      return removeRating ? client.sremAsync(feelingUserSet, itemId) :
        client.saddAsync(feelingUserSet, itemId);
    }).then(() => {
      return removeRating ? client.sremAsync(feelingItemSet, userId) :
        client.saddAsync(feelingItemSet, userId);
    }).then(() => {
      return client.sismemberAsync(feelingItemSet, userId);
    }).then((result) => {
      // only fire update sequence if requested by the user
      // and there are results to compare
      if (updateRecommendations && result > 0) {
        updateSequence(userId, itemId).then(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
};

const liked = function (userId, itemId, options = {}) {
  options.liked = true;
  return changeRating(userId, itemId, options);
};

const visited = function (userId, itemId, options = {}) {
  options.visited = true;
  return changeRating(userId, itemId, options);
};

const reviewed = function (userId, itemId, options = {}) {
  options.reviewed = true;
  return changeRating(userId, itemId, options);
};


const polled = function (userId, itemId, options = {}) {
  options.polled = true;
  return changeRating(userId, itemId, options);
};

const scored = function (userId, itemId, options = {}) {
  options.scored = true;
  return changeRating(userId, itemId, options);
};

const wishlisted = function (userId, itemId, options = {}) {
  options.wishlisted = true;
  return changeRating(userId, itemId, options);
};



const disliked = function (userId, itemId, options = {}) {
  options.liked = false;
  return changeRating(userId, itemId, options);
};

const unliked = function (userId, itemId, options = {}) {
  options.liked = true;
  options.removeRating = true;
  return changeRating(userId, itemId, options);
};

const undisliked = function (userId, itemId, options = {}) {
  options.liked = false;
  options.removeRating = true;
  return changeRating(userId, itemId, options);
};

const input = {
  liked,
  visited,
  reviewed,
  polled,
  wishlisted,
  scored,
  disliked,
  unliked,
  undisliked,
  updateSequence
};

module.exports = input;
