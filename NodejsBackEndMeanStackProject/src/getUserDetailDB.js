const dbConnected = require('./dbConfigurationtModule/configDatabase');

let getUserDetailDB = async (UserDetails) => {

    let sql = "Select * from customers where email_id = ? and password = ?";
    const dbConnect = await dbConnected();
    let result = await dbConnect.queryAsync(sql, UserDetails);
    await dbConnect.end();
    console.log("DB connect ends in GETDetails");
    return result;
};

let getEmailDetailDB = async (UserDetails) => {

    let sql = "Select * from customers where email_id = ?";
    const dbConnect = await dbConnected();
    let result = await dbConnect.queryAsync(sql, UserDetails);
    await dbConnect.end();
    console.log("DB connect ends in GETDetails");
    return result;
};

let getCourseDetail = async () => {

    let sql = "Select course_Id, Title, Duration, Price from Courses";
    const dbConnect = await dbConnected();
    let courseDetails = await dbConnect.queryAsync(sql);
    await dbConnect.end();
    console.log("DB connect ends in GETDetails");
    return courseDetails;
};

let getCourseVideoUrl = async () => {

    let sql = "Select Title, Videourl from Courses";
    const dbConnect = await dbConnected();
    let courseDetails = await dbConnect.queryAsync(sql);
    await dbConnect.end();
    console.log("DB connect ends in GETDetails");
    return courseDetails;
};


module.exports = { getUserDetailDB, getEmailDetailDB, getCourseDetail, getCourseVideoUrl };