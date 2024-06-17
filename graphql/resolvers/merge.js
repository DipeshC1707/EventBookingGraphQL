const { dateToString } = require("../../helpers/date");
const Event = require("../../model/event");
const User = require('../../model/user');

const events = async eventId => {
    try {
        const events = await Event.find({ _id: { $in: eventId } })
        return events.map(event => {
            return transformEvent(event);
        });
    }
    catch (err) {
        throw err;
    }
}

const singleEvent =async eventId =>{
    try{
        const event = await Event.findById(eventId);
        return transformEvent(event);
    }catch(err){
        throw err;
    }
}

const user = (userId) => {
    return User.findById(userId)
        .then(user => {
            return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user.createdEvents) }
        })
        .catch(err => {
            throw err;
        })
}

const transformBooking = booking =>{
    return {
        ...booking._doc,
        _id:booking.id,
        user:user.bind(this, booking.user),
        event:singleEvent.bind(this,booking.event),
        createdAt:dateToString(booking._doc.createdAt),
        updatedAt:dateToString(booking._doc.updatedAt)
    }
}

const transformEvent = event =>{
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event.date),
        creator: user.bind(this, event.creator)
    }
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;