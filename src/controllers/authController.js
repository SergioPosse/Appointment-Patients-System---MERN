const  { Router } = require('express');
const router = Router();

router.get('/',(req,res,next)=>{
    res.render("login.html");
})

module.exports = router;