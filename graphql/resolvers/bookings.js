const Booking = require("../../model/booking");
const Event = require("../../model/event");
const { transformBooking } = require("./merge");


module.exports = {
    bookings:async (args,req)=>{
        if(!req.isAuth){
            throw new Error('Unauthorized');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking=>{
                return transformBooking(booking);
            })
        } catch (err) {
            throw err;
        }
    },
    bookEvent:async (args,req) =>{
        if(!req.isAuth){
            throw new Error('Unauthorized');
        }
        try {
            const fetchedEvent = await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                user:req.userId,
                event:fetchedEvent
            });
            const res = await booking.save();
            return transformBookings(res);
        } catch (err) {
            throw err;
        }
    },
    cancelBooking:async (args,req) =>{
        if(!req.isAuth){
            throw new Error('Unauthorized');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event =  transformEvent(booking.event);
            await Booking.deleteOne({_id:args.bookingId});
            return event;
        } catch (err) {
            throw err;
        }
    }
}