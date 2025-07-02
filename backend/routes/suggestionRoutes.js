const  express =  require('express');
const   suggestPet  = require( '../controllers/suggestionController.js');

const router = express.Router();
router.post('/suggest-pet', suggestPet);

module.exports = router;