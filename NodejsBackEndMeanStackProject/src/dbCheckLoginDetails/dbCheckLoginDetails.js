function checkLoginDetails(dbdata, UserLogin) {
    //console.log(dbdata, UserLogin);
    if (Object.keys(dbdata).length === 0) {
        return false;
    }
    else if (dbdata[0].email_id === UserLogin[0] && dbdata[0].password === UserLogin[1]) {
        return true;
    }
    return false;

}

function checkEmail(dbdata, UserLogin) {
    if (Object.keys(dbdata).length == 0) {
        return false;
    }
    else if (dbdata[0].email_id == UserLogin) {
        return true;
    }
    return false;
}

module.exports = { checkLoginDetails, checkEmail };