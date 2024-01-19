const flightSchema = new mongoose.Schema({
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
        default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

module.exports = mongoose.model('Flight', flightSchema);
