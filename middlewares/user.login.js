const user = require("../models/user.model");
const account = require("../models/login.accounts.model");
const md5 = require("md5");
exports.attempt = async (username, password) => {
    if(!password||!username)
    {
        console.log("Username or Password was empty");
        return false;
    }
    if (await user.exists({
        $or: [{ email: username, pwd_hash: md5(password) }
            , { ph_no: username, pwd_hash: md5(password) }]
    })) {
        var uid = await user.findOne({
             email: username, pwd_hash: md5(password)               
        });
        if (uid)
            return uid;
        else
            return false;
    }
    else {
        console.log("User not in database");
        return false
    }
}

exports.verify= async(session_id,user_id)=>{
    if (!session_id || !user_id) {
        return false;
    }
    if (await account.exists({ user_id: user_id, session_id: session_id, status:1})) {
        var user_account = await user.findOne({ user_id: user_id, session_id: session_id, status: 1 });
        if (user_account)
            return user_account;
        else
            return false;
    }
    else {
        return false
    }
}