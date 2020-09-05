
function checkFormValidation(UserDetails) {
    let detailLength = UserDetails.length;
    let regEmail = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}");
    let regPassword = new RegExp("[a-zA-Z0-9@#%&+]+");

    if (detailLength == 5) {
        let regName = new RegExp("[a-zA-Z]{1,20}");
        let regNo = new RegExp("[0-9]{8,15}");
        if (!regName.test(UserDetails[0])) {
            return "First Name should not contain Space, numbers, special charaters and contain only Aplhabets";
        }
        else if (!regName.test(UserDetails[1])) {
            return "Last Name should not contain Space, numbers, special charaters and contain only Aplhabets";
        }
        else if (!regEmail.test(UserDetails[2])) {
            return "Email should be in specified Format abcd@email.com";
        }
        else if (!regNo.test(UserDetails[3])) {
            return "Contact should contain only number between 8-15 no.";
        }
        else if (!regPassword.test(UserDetails[4])) {
            return "Password should not contain space and must be betn 6-15 length";
        }

    }
    else if (detailLength == 2) {
        if (!regEmail.test(UserDetails[0])) {
            return "Email should be in specified Format abcd@email.com";
        }
        else if (!regPassword.test(UserDetails[1])) {
            return "Password should not contain space and must be betn 6-15 length";
        }
    }
    return "1";
}

module.exports = checkFormValidation;