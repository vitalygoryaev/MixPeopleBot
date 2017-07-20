const googleapis = require('googleapis');
const promisify = require('es6-promisify');
const EventEmitter = require('events');
const { NEW_YOUTUBE_VIDEO } = require('../events');

const youtube = googleapis.youtube('v3');
const getVideoList = promisify(youtube.search.list);
const eventEmitter = new EventEmitter();

const TEN_SECONDS = 10 * 1000;

class YoutubeMiner {
  constructor(accountSettings, eventEmitter) {
    this.accountSettings = accountSettings;
    this.latestVideoId = '';
    this.minerInterval = null;
    this.eventEmitter = eventEmitter;
  }

  async getLatestVideoId() {
    const videoList = await getVideoList(
      {
        auth: this.accountSettings.apikey,
        part: 'id',
        channelId: 'UCctXZhXmG-kf3tlIXgVZUlw',
        order: 'date',
        maxResults: 1,
      },
    );

    const { items: [{ id: { videoId } }] } = videoList;

    return videoId;
  }

  mine() {
    this.minerInterval = setInterval(async () => {
      const videoId = await this.getLatestVideoId();

      if (videoId && this.latestVideoId !== videoId) {
        // NOTIFY ALL SUBSCRIBERS
        this.eventEmitter.emit(NEW_YOUTUBE_VIDEO, { url: `https://www.youtube.com/watch?v=${videoId}` });

        this.latestVideoId = videoId;
      }
    }, TEN_SECONDS);
  }

  stopMining() {
    clearInterval(this.minerInterval);
    this.minerInterval = null;
  }
}

module.exports = YoutubeMiner;
