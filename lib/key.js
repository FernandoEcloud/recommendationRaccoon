
const config = require('./config.js');

const USER = 'user',
  ITEM = 'item';

class Key {
  constructor() {
    this.key = '';
    this.keyArr = [];
  }

  joinKey() {
    this.key = [config.className].concat(this.keyArr).join(':');
    return this.key;
  }

  userLikedSet(userId) {
    this.keyArr = [USER, userId, 'liked'];
    return this.joinKey();
  }

  userVisitedSet(userId) {
    this.keyArr = [USER, userId, 'visited'];
    return this.joinKey();
  }

  userReviewedSet(userId) {
    this.keyArr = [USER, userId, 'reviewed'];
    return this.joinKey();
  }

  userPolledSet(userId) {
    this.keyArr = [USER, userId, 'polled'];
    return this.joinKey();
  }

  userWishlistedSet(userId) {
    this.keyArr = [USER, userId, 'wishlist'];
    return this.joinKey();
  }


  userScoredSet(userId) {
    this.keyArr = [USER, userId, 'scored'];
    return this.joinKey();
  }


  userDislikedSet(userId) {
    this.keyArr = [USER, userId, 'disliked'];
    return this.joinKey();
  }


  itemLikedBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'liked'];
    return this.joinKey();
  }

  itemReviewedBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'reviewed'];
    return this.joinKey();
  }


  itemPolledBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'polled'];
    return this.joinKey();
  }


  itemScoredBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'scored'];
    return this.joinKey();
  }


  itemWishlistedBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'whislisted'];
    return this.joinKey();
  }

  itemVisitedBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'visited'];
    return this.joinKey();
  }


  itemDislikedBySet(itemId) {
    this.keyArr = [ITEM, itemId, 'disliked'];
    return this.joinKey();
  }

  mostLiked() {
    this.keyArr = ['mostLiked'];
    return this.joinKey();
  }

  mostVisited() {
    this.keyArr = ['mostVisited'];
    return this.joinKey();
  }

  mostReviewed() {
    this.keyArr = ['mostReviewed'];
    return this.joinKey();
  }

  mostPolled() {
    this.keyArr = ['mostPolled'];
    return this.joinKey();
  }

  mostScored() {
    this.keyArr = ['mostScored'];
    return this.joinKey();
  }

  mostWishlisted() {
    this.keyArr = ['mostWishlisted'];
    return this.joinKey();
  }

  mostDisliked() {
    this.keyArr = ['mostDisliked'];
    return this.joinKey();
  }

  recommendedZSet(userId) {
    this.keyArr = [USER, userId, 'recommendedZSet'];
    return this.joinKey();
  }

  scoreboardZSet() {
    this.keyArr = ['scoreboard'];
    return this.joinKey();
  }

  similarityZSet(userId) {
    this.keyArr = [USER, userId, 'similarityZSet'];
    return this.joinKey();
  }

  tempAllLikedSet(userId) {
    this.keyArr = [USER, userId, 'tempAllLikedSet'];
    return this.joinKey();
  }
}

module.exports = exports = new Key();
