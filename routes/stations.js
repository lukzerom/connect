const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  check,
  validationResult
} = require('express-validator');
const User = require('../models/User');
const Station = require('../models/Station');
const Reservation = require('../models/Reservation');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);




// @route GET api/stations/:id
// @desc Get choosen station
// @access Private

router.get('/stations/:id', auth, async (req, res) => {

  try {
    const station = await Station.find({
      id: req.params.id
    })
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route GET api/stations
// @desc Get all statios
// @access Public

router.get('/', async (req, res) => {
  try {
    const stations = await Station.find({}).select('-user').sort({});
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/stations/userstations
// @desc Get all user statios
// @access Private

router.get('/userstations', auth, async (req, res) => {
  try {
    const stations = await Station.find({
      user: req.user.id
    }).sort({
      date: -1
    });
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// @route POST api/stations
// @desc Add station
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('country', 'Please enter country of this station')
      .not()
      .isEmpty(),
      check('name', 'Please enter unusual name of this station')
      .not()
      .isEmpty(),
      check('city', 'Please enter city of this station')
      .not()
      .isEmpty(),
      check('longitude', 'Please pick location on map with marker')
      .not()
      .isEmpty(),
      check('latitude', 'Please pick location on map with marker')
      .not()
      .isEmpty(),
      check('street', 'Please enter street of this station')
      .not()
      .isEmpty(),
      check('streetNumber', 'Please add street number of this station')
      .not()
      .isEmpty(),
      check('plugin', 'Please enter plugin type of this station')
      .not()
      .isEmpty(),
      check('price', 'Please add price per full charge of car')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      name,
      country,
      city,
      street,
      streetNumber,
      longitude,
      latitude,
      plugin,
      price,
      additives,
      picture
    } = req.body;

    try {
      const newStation = new Station({
        name,
        country,
        city,
        street,
        streetNumber,
        longitude,
        latitude,
        plugin,
        price,
        additives,
        picture,
        user: req.user.id
      });

      const station = await newStation.save();
      res.json(station);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error ');
    }
  }
);

// @route PUT api/stations/:id
// @desc Edit station details
// @access Private

router.put('/:id', auth, async (req, res) => {
  const {
    name,
    country,
    city,
    street,
    streetNumber,
    longitude,
    latitude,
    plugin,
    price,
    additives,
    picture
  } = req.body;

  const stationFields = {};

  if (name) stationFields.name = name;
  if (country) stationFields.country = country;
  if (city) stationFields.city = city;
  if (street) stationFields.street = street;
  if (streetNumber) stationFields.streetNumber = streetNumber;
  if (longitude) stationFields.longitude = longitude;
  if (latitude) stationFields.latitude = latitude;
  if (plugin) stationFields.plugin = plugin;
  if (price) stationFields.price = price;
  if (additives) stationFields.additives = additives;
  if (picture) stationFields.picture = picture;

  try {
    let station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        msg: 'Station not found'
      });
    }

    //Make sure user owns station

    if (station.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not authorized'
      });
    }

    station = await Station.findByIdAndUpdate(
      req.params.id, {
        $set: stationFields
      }, {
        new: true
      }
    );
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error ');
  }
});

// @route DELETE api/stations/:id
// @desc Delete station
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        msg: 'Station not found'
      });
    }

    //Make sure user owns contacts

    if (station.user.toString() !== req.user.id) {
      return res.status(401).json({
        nsg: 'Not authorized'
      });
    }
    await Station.findByIdAndRemove(req.params.id);

    res.json({
      msg: 'Station removed'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error ');
  }
});

// @route PAST api/stations/booking/:id
// @desc Book a station
// @access Private

router.post('/booking/:id', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  let station = await Station.findById(req.params.id);

  let stationReservations = await Reservation.find({
    station: station._id
  });
  const {
    timeStampFrom,
    timeStampTo
  } = req.body;

  //Calculate user range

  const userRange = moment.range(
    moment(new Date(timeStampFrom)),
    moment(new Date(timeStampTo))
  );

  //Get user

  const user = await User.findById(req.user.id).select('-password');

  //Make sure that dates are not overlapping

  stationReservations.forEach(reservation => {
    let bookingTimeStampFrom = moment(new Date(reservation.timeStampFrom));
    let bookingTimeStampTo = moment(new Date(reservation.timeStampTo));
    const strangerRange = moment.range(
      bookingTimeStampFrom,
      bookingTimeStampTo
    );

    if (userRange.overlaps(strangerRange)) {
      return res.status(400).json({
        msg: 'This time is already reserved'
      });
    }
  });

  //Make sure user does not book his own station
  if (station.user.toString() === req.user.id) {
    return res.status(400).json({
      msg: "Can't book your station"
    });
  }

  //Calculate how many electrons will be needed to transaction

  const requiredElectrons = userRange.diff('hours') * station.price;

  //Make sure user has electrons for transaction

  if (user.electrons <= requiredElectrons) {
    return res.status(402).json({
      msg: 'You dont have enough electrons'
    });
  }

  //Create object for user with new amount of electrons
  const userElectrons = user.electrons - requiredElectrons;

  const userFields = {
    electrons: userElectrons
  };

  //Get owner of station
  const owner = await User.findById(station.user).select('-password');

  const ownerElectrons = owner.electrons + requiredElectrons;

  const ownerFields = {
    electrons: ownerElectrons
  };

  //Inside try, firstly reservation must be done. Then the electrons are settled between users

  try {
    const newReservation = new Reservation({
      timeStampFrom,
      timeStampTo,
      user: req.user.id,
      station: station._id
    });

    const reservation = await newReservation.save();
    await User.findByIdAndUpdate(
      req.user.id, {
        $set: userFields
      }, {
        new: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
    await User.findByIdAndUpdate(
      owner._id, {
        $set: ownerFields
      }, {
        new: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error ');
  }
});

module.exports = router;