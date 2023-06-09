const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
      res.send([global.food_items,global.can_names])
    }catch(error){
          console.error(error.message)
          res.send("Server error")
    }
})

module.exports=router;