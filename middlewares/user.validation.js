const user = require("../models/user.model");
exports.validate_new_registration = async (User) => {
    var regName = /^[A-Za-z]+$/;
   
    if (!regName.test(User.f_name)) {
        return 'Invalid first name.';
    } 
    else if (!regName.test(User.l_name)) {
        return 'Invalid last name.';
    } 
    else if(!ValidateEmail(User.email))
    {
        return "Invalid Email Id"
    }
    else if(!ValidatePhoneNumber(User.ph_no))
    {
        return "Enter a valid Phone Number"
    }
    else if (await user.exists({ email: User.email })) {
        return "Email already Exists";
    }
    else if (await user.exists({ ph_no: User.ph_no })) {
        return "Phone Number already Exists";
    }
    else{
        return true;
    }
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
function ValidatePhoneNumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneno.test(inputtxt)) {
        return true;
    }
    else {
        return false;
    }
}