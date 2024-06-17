const auth = require("./auth");
const bookings = require("./bookings");
const events = require("./events");

const rootResolver = {
    ...auth,
    ...bookings,
    ...events
}

module.exports = rootResolver;