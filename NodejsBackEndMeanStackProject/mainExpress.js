const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const { getUserDetailDB, getEmailDetailDB, getCourseDetail, getCourseVideoUrl } = require('./src/getUserDetailDB');
const { addUsertoDB, addCoursetoDB, deleteCourse } = require('./src/addUsertoDB');
const { DetailsExtracter, addCourseExtractor } = require('./src/FormDetailsExtactModule/FormDetailsExtracter');
const checkFormValidation = require('./src/FormValidationModule/checkFormValidation');
const { checkLoginDetails, checkEmail } = require('./src/dbCheckLoginDetails/dbCheckLoginDetails');



app.use(cors()); // unblocking cors policy
app.use(express.json()); // BODY :: RAW :: JSON
app.use(express.urlencoded({ extended: true })); // BODY

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded());
//app.use(express.json());


app.post('/login', async (req, res) => {
    try {
        console.log("loginroute");
        let UserDetails = await DetailsExtracter(req.body);
        let dbData = await getUserDetailDB(UserDetails);
        let CheckDetails = checkLoginDetails(dbData, UserDetails);
        if (CheckDetails == true) {
            res.json({ "mssg": "success", emailid: dbData[0].email_id });
            res.end();
        } else {
            res.json({ "mssg": "unsucess", "type": "Invalid Credential" });
            res.end();
        }
    } catch (err) {
        console.log(err.message);
        res.json(err.message);
    }

});


app.post('/signup', async (req, res) => {
    try {
        console.log("signuproute");
        console.log(req.body);
        let UserDetails = await DetailsExtracter(req.body);
        console.log(UserDetails);
        let UserEmailPass = UserDetails[2];
        let formValidated = await checkFormValidation(UserDetails);
        let dbData = await getEmailDetailDB(UserEmailPass)
        let CheckDetails = checkEmail(dbData, UserEmailPass);
        if (CheckDetails == true) {
            res.json({ "mssg": "unsuccess", "type": "Account with this  Already Exists" });
            res.end();
        }
        else if (UserDetails.length == 5 && formValidated == "1" && CheckDetails == false) {
            let Data = await addUsertoDB(UserDetails)
            res.json({ "mssg": "success", "dbdata": Data });
            res.end();

        } else {
            res.json({ "mssg": "unsuccess", 'type': formValidated });
            res.end();
        }
    } catch (err) {
        res.end(err.message, { "mssg": "unsuccess", 'type': formValidated });
    }

});

app.post('/api/addCourse', async (req, res) => {

    try {
        console.log("/api/addcourse");
        console.log(req.body);
        let courseAddForm = await addCourseExtractor(req.body);
        console.log(courseAddForm);
        let Data = await addCoursetoDB(courseAddForm);
        res.json(Data);
        res.end();

    } catch (err) {
        res.end(err.message, { "mssg": "unsuccess" });
    }

});

app.get("/api/course", async (req, res) => {
    try {
        let dbData = await getCourseDetail();
        //console.log(dbData);
        res.json(dbData);
        res.end();
    } catch (err) {
        res.end(err.message, { "mssg": "unsuccess" });
    }

});

app.get("/api/courseVideourl", async (req, res) => {
    try {
        let dbData = await getCourseVideoUrl();
        //console.log(dbData);
        res.json(dbData);
        res.end();
    } catch (err) {
        res.end(err.message, { "mssg": "unsuccess" });
    }

});


app.get("/deleteCourse", async (req, res) => {
    try {
        let D_id = req.query.course_id;
        console.log(D_id);
        let dbData = await deleteCourse(D_id);
        //console.log(dbData);
        res.json(dbData);
        res.end();
    } catch (err) {
        res.end(err.message, { "mssg": "unsuccess" });
    }

});



app.listen(8080);





/*
const router = express.Router();

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);


app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
*/

//var jsonParser = bodyParser.json()


/*
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/login', async (req, res) => {
    res.write(loginPage);
    res.end();
});

app.post('/login', urlencodedParser, async (req, res) => {
    try {
        //console.log(req.body.emailid);
        let UserDetails = await DetailsExtracter(req.body);
        let formValidated = checkFormValidation(UserDetails);
        //console.log(formValidated);
        if (UserDetails.length == 2 && formValidated == "1") {
            //console.log(UserDetails);
            await getUserDetailDB(UserDetails)
                .then((data) => {

                    let CheckDetails = checkLoginDetails(data, UserDetails);
                    if (CheckDetails == true) {
                        res.json(data);
                        res.end();
                    } else {
                        res.end("Details not match");
                    }
                }).catch((err) => {
                    console.log(err.message, 122);
                    res.end(err.message);
                });
        } else {
            res.json({ "mssg": "Incorrect Password or UserName !!!", 'mssg': formValidated });
            res.end();
        }
    } catch (err) {
        console.log(err.message);
        res.end(err.message);
    }

});

app.post('/signup', async (req, res) => {
    try {
        let UserDetails = await DetailsExtracter(req.body);
        let UserEmailPass = [UserDetails[2], UserDetails[4]];
        let formValidated = await checkFormValidation(UserDetails);
        let CheckDetails = false;
        await getUserDetailDB(UserEmailPass)
            .then((data) => {

                CheckDetails = checkEmail(data, UserEmailPass);
                if (CheckDetails == true) {
                    res.end("Account Already Exists");
                }
            }).catch((err) => {
                console.log(err.message);
                res.end(err.message);
            });
        if (UserDetails.length == 5 && formValidated == "1" && CheckDetails == false) {
            await addUsertoDB(UserDetails)
                .then((data) => {
                    res.json(data);
                    res.end();
                }).catch((err) => {
                    res.end(err.message);
                });
        } else {
            res.json({ "mssg": "Incorrect Format or details!!!", 'mssg': formValidated });
            res.end();
        }
    } catch (err) {
        res.end(err.message);
    }

});
*/