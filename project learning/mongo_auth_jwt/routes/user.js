const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin , Course, User } = require("../db/index")
const jwt = require("jsonwebtoken")
const { secret } = require("../auth");
const mongoose = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;

    try{
        const newuser = await User.create({
            username,
            password
        })

        res.json({
            msg:"sign up completed",
            userId: newuser._id
        })
    }catch{
        res.json({
            msg:"error is signing up"
        })
    }
});

router.post('/signin', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    

    try{
        const response = await User.findOne({
            username:username,
            password:password
        })

        if(response){
            const token=jwt.sign({
                username:username
            },secret)
            console.log(token);
            res.json({
                token:token
            })
        }
        else{
            res.json({
                msg:"invalid username or password"
            })
        }
    }catch{
        res.json({
            msg:"error in getting response from database"
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const response = await Course.find({});
        res.json({
            courses:response
        })
    }
    catch{
        res.json({
            msg: "error is getting courses from database"
        })
    }
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    const courseId = req.params.courseId;
    const username=req.username;
    try{
        const response= await User.updateOne({
            username
        },{
            "$push":{
                purchasedCourses:new mongoose.Types.ObjectId(courseId)
            }
        })
        res.json({
            mes:"purchase complete",
            response:response
        })
    }
    catch{
        res.json({
            msg:"purchase failed"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username=req.username;

    try{
        const user = await User.findOne({
            username:username
        })
        const response = await Course.find({
            _id:{
                "$in":user.purchasedCourses
            }
        })

        res.json({
            msg:response
        })
    }catch{
        res.json({
            msg: "cant get purchased courses"
        })
    }

});

module.exports = router