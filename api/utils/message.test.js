var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'Jen';
        var room = 'Node JS';
        var text = 'Some msg';
        var message = generateMessage(from, room, text);

        expect(typeof message.createdDate).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});
