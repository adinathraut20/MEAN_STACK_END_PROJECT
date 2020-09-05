const dbConnected = require('./dbConfigurationtModule/configDatabase');

let addUsertoDB = async (UserDetails) => {

    let sql = "Insert into Customers(First_Name,Last_Name,email_id,phone,password) values(?,?,?,?,?)";
    const dbConnect = await dbConnected();
    let result = await dbConnect.queryAsync(sql, UserDetails);
    await dbConnect.end();
    console.log("DB connect ends");
    return result;
};

let addCoursetoDB = async (courseAddForm) => {

    let sql1 = "Insert into Courses(Title,Duration,Price,Thumbnail,Videourl,email,Description1) values(?,?,?,?,?,?,?)";
    const dbConnect1 = await dbConnected();
    let result1 = await dbConnect1.queryAsync(sql1, courseAddForm);
    await dbConnect1.end();
    console.log("DB connect ends");
    return result1;
};

let deleteCourse = async (D_id) => {

    let sql1 = "DELETE FROM Courses where course_Id = ?";
    const dbConnect1 = await dbConnected();
    let result1 = await dbConnect1.queryAsync(sql1, D_id);
    await dbConnect1.end();
    console.log("DB connect ends");
    return result1;
};


module.exports = { addUsertoDB, addCoursetoDB, deleteCourse };