const user = require("../models/user.model");
const md5 = require("md5");
const { v4: uuidv4 } = require('uuid');
const asyncHandeler = require("express-async-handler");
const { response } = require("express");


exports.login_get = asyncHandeler(async (req, res) => {
    console.log("login user detected");
    res.send("this is a handelled login route");
});
exports.login_post = asyncHandeler(async (req, res) => {
    console.log("A user tried to login");
    var login = require("../middlewares/user.login");
    console.log(req.body)
    var resp = await login.attempt(req.body.username, req.body.password);

    if (resp) {
        var uuid = uuidv4();
        var account = require("../models/login.accounts.model");
        var login_account = new account(
            {
                user_id: resp,
                session_id: uuid,
                status: 1
            }
        )
        await account.deleteMany({ user_id: resp });
        await login_account.save();
        console.log(login_account);
        res.send(login_account);
        return;
    }
    else {
        console.log(resp);
        res.send(resp)
        return;
    }
});
exports.register_get = asyncHandeler(async (req, res) => {
    res.send("this is a GET route on register...  Please Use a POST route ")

});
exports.register_post = asyncHandeler(async (req, res) => {
    const validator = require("../middlewares/user.validation");
    var body = req.body;
    if (req.body.pwd_hash == "") {
        req.body.pwd_hash = "nopass";
    }
    console.log(req.body);
    var User = new user(
        {
            f_name: body.f_name,
            l_name: body.l_name,
            email: body.email,
            ph_no: body.ph_no,
            dob: body.dob,
            avatar_url: "/images/avatar.png",
            pwd_hash: md5(body.pwd_hash),
            rating: 0,
            balance: 0,
            trip_count: 0,
            user_type: 0
        }
    );
    console.log(User);
    var valid = await validator.validate_new_registration(User);
    if (valid == true) {
        await User.save();
        res.send("Success saving data")
    }
    else {
        console.log(valid);
        res.send(valid);
    }

    console.log("done validation")

});

exports.verify_post=asyncHandeler(async(req,res)=>{
    const login=require("../middlewares/user.login");
    var resp;
    console.log(req.body)
    if(resp=await login.verify(req.body.session_id,req.body.user_id))
    {
        console.log("Verified already logged in account");
    }
    else
    {
        console.log("failed to verify already logged in account" + resp);
    }
    res.send(resp)
    
});