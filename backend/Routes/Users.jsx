const express = require('express');

const router = express.Router();

const User = require('../models/User.jsx');

const { body, validationResult } = require('express-validator')

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const jwtSecret = 'Rp3sT7uGqkDWvX6y9A0Zc1nL4oJbEhF5';

router.post("/createuser", [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Minimum length should be 5 characters').isLength({ min: 5 }),
    body('name', 'Minimum length should be 5 characters').isLength({ min: 5 }),
    body('m_no','Length should be 10').isLength({min:10,max:10})],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).send("Invalid values");
        }

        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password,salt);

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: secPass,
                m_no: req.body.m_no,
                cart: [],
                orders: []
            });
            res.json({ success: true });
        } catch (error) {
            // console.log(error);
            return res.status(400).send("Wrong email format");
        }
    }
)

router.post("/login", [
        body('email','Incorrect email format').isEmail(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).send("Wrong email format");
        }
        try {
            const result = await User.findOne({email:req.body.email});
            if (!result){
                return res.status(400).send("No User with such email");
            }
            const secPass = result.password;
            const isReal = bcrypt.compareSync(req.body.password,secPass);
            if (!isReal){
                return res.status(400).send("Incorrect Password!");
            }

            const data = {
                id:result._id
            }

            let authToken = jwt.sign(data,jwtSecret);
            // console.log(authToken);
            return res.json({message:"Logged in successfully",authToken:authToken});
        } catch (error) {
            // console.log(error);
            return res.status(400).send("ERROR");
        }
    }
)

router.post("/cart",async (req,res) => {
    try {
        const id = jwt.decode(req.body.id).id
        const user1 = await User.findOne({_id:id})
        return res.json({cart:user1.cart})
        // return res.send(jwt.decode(req.body.id).user.id)
    } catch (error) {
        return res.send("ERROR")
    }
})

router.put("/cart",async (req,res) => {
    

    try {
        const id = jwt.decode(req.body.id).id
        const user1 = await User.findOne({_id:id})
            
        user1.cart = req.body.cart;

        let result = await User.findByIdAndUpdate(id, {$set: user1}, {new : true});
        if (!result) return res.status(400).send("NOPE");
        return res.status(200).send(result);
        
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send("ERROR");
    }

    
})

router.put("/orders",async (req,res) => {
    

    try {
        const id = jwt.decode(req.body.id).id
        const user1 = await User.findOne({_id:id})

        // console.log("2", req.body.orders);
        user1.orders.push({order:req.body.orders});
        // console.log(user1.orders.length);
        // console.log(user1.orders);


        const result = await User.findByIdAndUpdate(id, {$set: user1}, {new: true});
        return res.status(200).send(result);
        
    } catch (error) {
        // console.log(error.message);
    }
})

router.post("/orders",async (req,res) => {
    

    try {
        const id = jwt.decode(req.body.id).id
        const user1 = await User.findOne({_id:id})
        
        return res.status(200).send(user1.orders);
        
    } catch (error) {
        // console.log(error.message);
    }
})

module.exports = router;