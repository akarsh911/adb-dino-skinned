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
    if (await account.exists({ user_id: uid, session_id: sid, status:1})) {
        console.log(uid)
        var user_account = await user.findOne({ _id: uid });
        user_account=JSON.parse(user_account.toString());
        console.log(user_account)
        if (user_account)
        {
             delete user_account.pwd_hash;
             console.log(user_account)
             return user_account;
        }

        else
            return false;
    }
    else {
        return false
    }
}