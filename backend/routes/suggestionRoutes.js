const  express =  require('express');
const   suggestPet  = require( '../controllers/suggestionController.js');

const router = express.Router();
router.post('/', suggestPet);

module.exports = router;