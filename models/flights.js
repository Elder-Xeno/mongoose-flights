const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['America', 'Southwest', 'United'],
    },

    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
      },
      flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
      },
      departs: {
        type: Date,
        default: () => {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            return oneYearFromNow;
        },
    },
}, {
    toJSON: { virtuals: true },
});

flightSchema.virtual('formattedDeparts').get(function () {
  return this.departs.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

module.exports = mongoose.model('Flight', flightSchema);
