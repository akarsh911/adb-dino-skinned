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
    console.log(req.params)
    var resp = await login.attempt(req.params.username, req.params.password);
    if(!req.params)
    return res.send("NO PARAMS PASSED")

  if(!req.params.address_line)
    return res.send("NO address_line PASSED")

  if(req.params.address_line === ""){
    res.send("ADDRESS LINE EMPTY.")
  } else {
    res.send("ADDRESS LINE > ",req.params.address_line)
  }
    
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
        login_account.save();
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
    var params = req.params;
    console.log(req);
    if (req.params.pwd_hash == "") {
        req.params.pwd_hash = "nopass";
    }
    console.log(req.params);
    var User = new user(
        {
            f_name: params.f_name,
            l_name: params.l_name,
            email: params.email,
            ph_no: params.ph_no,
            dob: params.dob,
            avatar_url: "/images/avatar.png",
            pwd_hash: md5(params.pwd_hash),
            rating: 0,
            balance: 0,
            trip_count: 0,
            user_type: 0

        }
    );
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