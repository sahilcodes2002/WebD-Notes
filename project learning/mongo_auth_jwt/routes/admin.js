const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const { secret } = require("../auth");
const router = Router();
const { Admin , Course } = require("../db/index")

// Admin Routes
router.post('/signup',async (req, res) => {
    const username= req.body.username;
    const password=req.body.password;

    try{
        await Admin.create({
            username,
            password
        })
        res.json({
            msg:"Admin sign up completed"
        })
    }
    catch{
        res.json({
            msg:"admin not created"
        })
    }


});

router.post('/signin',async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    try{
        const response = await Admin.findOne({
            username:username,
            password:password
        })


        if(response){
            console.log(username);
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
                msg:"wrong credentials"
            })
        }
    }catch{
        res.json({
            msg:"could not sign in"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;

    try{
        const newCourse=await Course.create({
            title,
            description,
            price,
            imageLink
        })

        res.json({
            msg:"Course created successfully",
            courseId:newCourse._id
        })
    }

    catch{
        res.json({
            msg:"course not created"
        })
    }

});

router.get('/courses', adminMiddleware,async (req, res) => {
    try{
        const allCourse = await Course.find({});
        res.json({
            courses:allCourse
        })
    }
    catch{
        res.json({
            msg:"unable to get courses"
        })
    }
});

module.exports = router;