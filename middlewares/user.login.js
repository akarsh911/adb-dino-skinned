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
            $or: [{ email: username, pwd_hash: md5(password) }
                , { ph_no: username, pwd_hash: md5(password) }]
        });
        
        if (uid)
            return uid._id;
        else
            return false;
    }
    else {
        console.log("User not in database");
        return false
    } 
}

exports.verify= async(sid,uid)=>{
    console.log(await account.findOne({session_id:sid.toString() }))
    if (await account.exists({ user_id: uid, session_id: sid, status:1})) {
        console.log("account found")
        var user_account = await user.findOne({ user_id: uid, session_id: sid, status: 1 });
        if (user_account)
            return user_account;
        else
            return false;
    }
    else {
        return false
    }
}