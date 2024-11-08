const express = require('express')
const router = express.Router()



const getName = async (req, res) =>{
   
    console.log(req.query.id)
    res.status(200).json({response:"llegó el mensaje"})
}





router.get('/', getName)
router.post('/', getName)
router.delete('/', getName)
router.put('/', getName)

module.exports = router