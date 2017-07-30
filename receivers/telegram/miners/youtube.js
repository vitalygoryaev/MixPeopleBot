const googleapis = require('googleapis');
const promisify = require('es6-promisify');
const { NEW_YOUTUBE_VIDEO } = require('../events');
const { queryLatestYoutubeVideoId, persistLatestYoutubeVideoId } = require('../dataLayer');

const youtube = googleapis.youtube('v3');
const getVideoList = promisify(youtube.search.list);

const TEN_SECONDS = 10 * 1000;

class YoutubeMiner {
  constructor(accountSettings, eventEmitter) {
    this.accountSettings = accountSettings;
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
      const latestVideoId = await this.getLatestVideoId();
      const currentLatestVideoId = await queryLatestYoutubeVideoId();

      if (
        latestVideoId
        && currentLatestVideoId !== latestVideoId
      ) {
        persistLatestYoutubeVideoId(latestVideoId);

        // NOTIFY ALL SUBSCRIBERS
        this.eventEmitter.emit(NEW_YOUTUBE_VIDEO, { url: `https://www.youtube.com/watch?v=${latestVideoId}` });
      }
    }, TEN_SECONDS);
  }

  stopMining() {
    clearInterval(this.minerInterval);
    this.minerInterval = null;
  }
}

module.exports = YoutubeMiner;
