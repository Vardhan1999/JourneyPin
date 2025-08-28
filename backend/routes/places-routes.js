const express = require('express');
const router = express.Router();

// Dummy places data
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Eiffel Tower',
    description: 'Iconic tower in Paris',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Statue of Liberty',
    description: 'Famous statue in New York',
    address: 'Liberty Island, New York, NY 10004, USA',
    creator: 'u2'
  },
  {
    id: 'p3',
    title: 'Taj Mahal',
    description: 'Historic mausoleum in India',
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    creator: 'u3'
  }
];

// GET /api/places/:pid
router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(place => place.id === placeId);
  res.json({ place });
});

// GET /api/places/user/:uid
router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter(p => p.creator === userId);
  res.json({ places });
});

module.exports = router;
