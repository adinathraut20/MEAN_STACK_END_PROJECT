
function DetailsExtracter(formSubmit) {
    let UserDetails = [];
    // console.log(Object.keys(formSubmit).length);
    let formLength = Object.keys(formSubmit).length;
    try {
        if (formLength == 2) {
            UserDetails[0] = formSubmit.emailid;
            UserDetails[1] = formSubmit.password;
            return UserDetails;
        }
        else if (formLength == 6) {
            UserDetails[0] = formSubmit.firstname;
            UserDetails[1] = formSubmit.lastname;
            UserDetails[2] = formSubmit.emailid;
            UserDetails[3] = formSubmit.phone;
            UserDetails[4] = formSubmit.password;
            return UserDetails;
        }
        else {
            console.log('Incorrect Details');
            return -1;
        }
    }
    catch (err) {
        return -1;
    }
}

function addCourseExtractor(NewCourseDetails) {
    let courseFormLength = Object.keys(NewCourseDetails).length;
    let courseForm = [];
    try {
        if (courseFormLength == 7) {
            courseForm[0] = NewCourseDetails.title;
            courseForm[1] = NewCourseDetails.duration;
            courseForm[2] = parseFloat(NewCourseDetails.price);
            courseForm[3] = NewCourseDetails.img;
            courseForm[4] = NewCourseDetails.video;
            courseForm[5] = NewCourseDetails.email;
            courseForm[6] = NewCourseDetails.description;

            return courseForm;
        } else {
            console.log('Incorrect Details');
            return -1;
        }
    } catch (err) {
        return -1;
    }
}


module.exports = { DetailsExtracter, addCourseExtractor };