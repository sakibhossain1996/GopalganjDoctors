const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
const port = process.env.PORT || 1337;

const con = require("./Database/database.js");
const {
    response
} = require("express");

app.get("/admin_login", function (req, res) {
    let sqlQuery =
        "SELECT `adminID` FROM `admin` where email = ? and password = ?";

    con.query(
        sqlQuery,
        [req.query.email, req.query.password],
        function (err, rows) {
            if (err) {
                res.json("something error");
            } else {
                var data = JSON.parse(JSON.stringify(rows[0]) || null);
                if (data == null) {
                    data = "-1";
                    const value = {
                        adminID: data,
                    };
                    res.json(value);
                } else {
                    res.json(data);
                }
            }
        }
    );
});

app.get("/patient_login", function (req, res) {
    let sqlQuery =
        "SELECT `patientID` FROM `patients` where patient_phone	 = ? and patient_password = ?";

    con.query(
        sqlQuery,
        [req.query.patient_phone, req.query.patient_password],
        function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                var data = JSON.parse(JSON.stringify(rows[0]) || null);
                if (data == null) {
                    data = -1;
                    const value = {
                        patientID: data,
                    };
                    res.json(value);
                } else {
                    res.json(data);
                }
            }
        }
    );
});

app.get("/doctor_login", function (req, res) {
    let sqlQuery =
        "SELECT `doctorID` FROM `doctors` where doctor_phone	 = ? and password = ?";

    con.query(
        sqlQuery,
        [req.query.doctor_phone, req.query.password],
        function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                var data = JSON.parse(JSON.stringify(rows[0]) || null);
                if (data == null) {
                    data = -1;
                    const value = {
                        doctorID: data,
                    };
                    res.json(value);
                } else {
                    res.json(data);
                }
            }
        }
    );
});

app.post("/add_doctors", function (req, res) {

    let sqlQuery = "INSERT INTO `doctors`( `doctor_name`, `doctor_designation`, `doctor_phone`,`password`) VALUES (?,?,?,?)";

    con.query(sqlQuery, [req.body.doctor_name, req.body.doctor_designation, req.body.doctor_phone, req.body.password], function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            var data = "successfully added";
            const value = {
                message: data,
            };

            res.json(value);
        }

    });
});

app.post("/serial_entry", function (req, res) {

    let sqlQuery = "INSERT INTO `serials`( `doctorID`, `patientID`, `age`, `disease`) VALUES (?,?,?,?)";

    con.query(sqlQuery, [req.body.doctorID, req.body.patientID, req.body.age, req.body.disease], function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            var data = "successfully added";
            const value = {
                message: data,
            };

            res.json(value);
        }

    });
});

app.post("/suggest_prescription", function (req, res) {

    let sqlQuery = "INSERT INTO `prescription`( `serialID`, `doctorID`, `patientID`, `medicine`, `days`, `rules`) VALUES (?,?,?,?,?,?)";

    con.query(sqlQuery, [req.body.serialID, req.body.doctorID, req.body.patientID, req.body.medicine, req.body.days, req.body.rules], function (err, rows) {

        if (err) {
            res.json(err);
        } else {



            let sqlQuery = "UPDATE `serials` SET `date`=? WHERE serialID=?";
            con.query(sqlQuery, [req.body.date, req.body.serialID], function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    var data = "successfully added";
                    const value = {
                        message: data,
                    };

                    res.json(value);
                }
            });

        }

    });
});

app.post("/get_doctors", function (req, res) {

    let sqlQuery = "SELECT * FROM `doctors`";

    con.query(sqlQuery, function (err, rows) {

        if (err) {
            res.json(err);
        } else {

            const value = {
                doctors: rows,
            };

            res.json(value);
        }

    });
});

app.post("/get_prescription", function (req, res) {

    let sqlQuery = "SELECT `prescriptionID`, `medicine`, `days`, `rules` FROM `prescription` WHERE serialID=?";

    con.query(sqlQuery, [req.body.serialID], function (err, rows) {

        if (err) {
            res.json(err);
        } else {

            const value = {
                medicines: rows,
            };

            //res.json(value);

            let sqlQuery = "SELECT `doctorID`, `patientID` FROM `prescription` WHERE serialID=?";
            con.query(sqlQuery, [req.body.serialID], function (err, rows) {
                if (err) {
                    res.json(err);
                } else {


                    var patientID = rows[0].patientID;
                    var doctorID = rows[0].doctorID;

                    let sqlQuery = "SELECT `doctorID`, `doctor_name`, `doctor_designation`, `doctor_phone` FROM `doctors` WHERE doctorID=?";
                    con.query(sqlQuery, [doctorID], function (err, rows) {
                        if (err) {
                            res.json(err);
                        } else {
                            const doctor = {
                                doctor: rows[0],
                                //patientID: rows[0].patientID,
                                //medicines: value.medicines
                            }



                            let sqlQuery = "SELECT patients.patientID as patientID, patients.patient_name as patient_name, patients.patient_phone as patient_phone,serials.age as age,serials.disease as disease FROM patients JOIN serials WHERE  patients.patientID=? && serials.serialID = ?";

                            con.query(sqlQuery, [patientID, req.body.serialID], function (err, rows) {

                                if (err) {
                                    res.json(err);
                                } else {
                                    const prescription = {
                                        doctor: doctor.doctor,
                                        patient: rows[0],
                                        medicines: value.medicines
                                    }

                                    res.json(prescription);
                                }

                            });
                        }
                    });
                }
            });
        }

    });
});

app.post("/get_doctors_profile", function (req, res) {

    let sqlQuery = "SELECT  `doctor_name`, `doctor_designation`, `doctor_phone` FROM `doctors` WHERE doctorID=?";

    con.query(sqlQuery, [req.body.doctorID], function (err, rows) {

        if (err) {
            res.json(err);
        } else {

            const value = {
                profile: rows[0],
            };

            res.json(value);
        }

    });
});

app.post("/get_doctor_serial_list", function (req, res) {

    let sqlQuery = "SELECT serials.serialID as serialID, serials.patientID,patients.patient_name as patient_name,patients.patient_phone as patient_phone, serials.age as patient_age, serials.disease as disease, serials.date as date FROM `serials` JOIN patients ON serials.patientID = patients.patientID WHERE doctorID = ? ";

    con.query(sqlQuery, [req.body.doctorID], function (err, rows) {

        if (err) {
            res.json(err);
        } else {

            const value = {
                serials: rows,
            };

            res.json(value);
        }

    });
});



app.post("/patient_profile", function (req, res) {

    let sqlQuery = "SELECT `patientID`, `patient_name`, `patient_phone` FROM `patients` WHERE patientID=?";

    con.query(sqlQuery, [req.body.patientID], function (err, rows) {

        if (err) {
            res.json(err);
        } else {

            /*const value = {
                profile: rows,
            };*/

            var data = JSON.parse(JSON.stringify(rows[0]) || null);

            res.json(data);
        }

    });
});

app.post("/patient_registration", function (req, res) {

    let sqlQuery = "SELECT `patient_phone` FROM `patients` WHERE patient_phone=?";

    con.query(sqlQuery, [req.body.patient_phone], function (err, rows) {

        if (err) {
            res.json(err);
        } else {


            //var data = JSON.parse(JSON.stringify(rows[0]) || null);
            if (rows.length == 1) {

                const value = {
                    status: 1,
                    message: "already registered",

                };
                res.json(value);
            } else {
                /*const value = {
                    status:"0",
                    message: "not found",
                    
                };
                res.json(value);*/

                let sqlQuery = "INSERT INTO `patients`(`patient_name`, `patient_phone`, `patient_password`) VALUES (?,?,?)";

                con.query(sqlQuery, [req.body.patient_name, req.body.patient_phone, req.body.patient_password], function (err, rows) {

                    if (err) {
                        res.json(err);
                    } else {

                        const value = {
                            status: 0,
                            message: "registration successfull",

                        };
                        res.json(value);
                    }

                });

            }

            //res.json(value);
        }

    });
});

app.listen(port);