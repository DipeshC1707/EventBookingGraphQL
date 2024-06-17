const { dateToString } = require('../../helpers/date');
const Event = require('../../model/event');
const User = require('../../model/user');
const { transformEvent } = require('./merge');

module.exports = {
    events: async (args,req) => {
        if(req.isAuth){
            throw new Error('Unauthorized');
        }
        try{
        const res = await Event.find();
        return res.map(event => {
            return transformEvent(event);
            });
        }catch(err) {
            console.error(err);
        }
    },
    createEvent: async (args ,req) => {
        if(!req.isAuth){
            throw new Error('Unauthorized');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date().toISOString(),
            creator: req.userId
        });
        let createdEvent;
        try {
            const res = await event.save();
            createdEvent = transformEvent(res);
            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error('User not found');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        }
        catch (err) {
            console.error(err);
            throw err;
        };
    },
}