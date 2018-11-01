
class Config {
  constructor(args) {
    this.nearestNeighbors = 30;
    this.className = 'eCloudTracker';
    this.numOfRecsStore = 100000;
    this.factorLeastSimilarLeastLiked = false;
    this.redisUrl = process.env.RACCOON_REDIS_URL || '127.0.0.1';
    this.redisPort = process.env.RACCOON_REDIS_PORT || 6379;
    this.redisAuth = process.env.RACCOON_REDIS_AUTH || '';
  }
}

module.exports = exports = new Config();
