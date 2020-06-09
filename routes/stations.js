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

// @route GET api/stations/availablestations
// @desc Get available stations 
// @access Pubilc

router.get('/availablestations/:from/:to', async (req, res) => {

  const {
    from,
    to
  } = req.params


  const userRange = moment.range(
    moment(Number(from)),
    moment(Number(to))
  );
  const stations = await Station.find({})
  let stationReservations = await Reservation.find({});

  //Getting all ID's of station reservations in this range of time
  let takenStationsAll = stationReservations.map(reservation => {
    let bookingTimeStampFrom = moment(new Date(reservation.timeStampFrom));
    let bookingTimeStampTo = moment(new Date(reservation.timeStampTo));
    let strangerRange = moment.range(
      bookingTimeStampFrom,
      bookingTimeStampTo
    );

    console.log(userRange, strangerRange)

    if (userRange.overlaps(strangerRange)) {
      return reservation.station.toString()
    }
  });

  //Reducing the same values

  let takenStations = [...new Set(takenStationsAll)]

  //Comparing taken stations ID with all stations
  let comparedStations = stations.map(station => {
    return takenStations.map(takenStation => {
      if (((station._id.toString()) !== takenStation)) {
        return station
      }
    })

  });

  //Reducing nested arrays from double map
  let array = []
  comparedStations.forEach(station => {

    array.push(station[0])
  })

  //Removing nulls
  let availablestations = array.filter((obj) => obj);

  try {
    res.json(availablestations);
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



module.exports = router;