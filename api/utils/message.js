var moment = require('moment');

var generateMessage = (from, room, text) => {
    return {
        from,
        room,
        text,
        createdDate: moment().valueOf()
    }
};

var generateYouTubeMessage = (from, room, video) => {
    console.log('Video:  '+video);
    return {
        from,
        room,
        url: `https://www.youtube.com/watch?v=${video}`,
        createdDate: moment().valueOf()
    }
}

module.exports = {generateMessage,generateYouTubeMessage};