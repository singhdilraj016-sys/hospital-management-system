const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ===================================== */
/* MIDDLEWARE */
/* ===================================== */

app.use(cors());
app.use(express.json());

/* ===================================== */
/* MONGODB CONNECTION */
/* ===================================== */

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

/* ===================================== */
/* HOME ROUTE */
/* ===================================== */

app.get("/", (req, res) => {
    res.send("Hospital Management Backend Running");
});

/* ===================================== */
/* PATIENT SCHEMA */
/* ===================================== */

const patientSchema = new mongoose.Schema({

    name: String,
    age: Number,
    disease: String,
    phone: String

});

const Patient = mongoose.model("Patient", patientSchema);

/* ===================================== */
/* DOCTOR SCHEMA */
/* ===================================== */

const doctorSchema = new mongoose.Schema({

    name: String,
    specialization: String,
    experience: Number,
    phone: String

});

const Doctor = mongoose.model("Doctor", doctorSchema);

/* ===================================== */
/* APPOINTMENT SCHEMA */
/* ===================================== */

const appointmentSchema = new mongoose.Schema({

    patientName: String,
    doctorName: String,
    appointmentDate: String,
    disease: String

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

/* ===================================== */
/* BILLING SCHEMA */
/* ===================================== */

const billingSchema = new mongoose.Schema({

    patientName: String,
    disease: String,
    doctorFee: Number,
    medicineFee: Number,
    total: Number

});

const Billing = mongoose.model("Billing", billingSchema);

/* ===================================== */
/* PATIENT ROUTES */
/* ===================================== */

/* GET ALL PATIENTS */
app.get("/patients", async (req, res) => {

    const patients = await Patient.find();

    res.json(patients);

});

/* ADD PATIENT */
app.post("/patients", async (req, res) => {

    const patient = new Patient({

        name: req.body.name,
        age: req.body.age,
        disease: req.body.disease,
        phone: req.body.phone

    });

    await patient.save();

    res.json({
        message: "Patient Added Successfully"
    });

});

/* UPDATE PATIENT */
app.put("/patients/:id", async (req, res) => {

    await Patient.findByIdAndUpdate(req.params.id, {

        name: req.body.name,
        age: req.body.age,
        disease: req.body.disease,
        phone: req.body.phone

    });

    res.json({
        message: "Patient Updated Successfully"
    });

});

/* DELETE PATIENT */
app.delete("/patients/:id", async (req, res) => {

    await Patient.findByIdAndDelete(req.params.id);

    res.json({
        message: "Patient Deleted Successfully"
    });

});

/* ===================================== */
/* DOCTOR ROUTES */
/* ===================================== */

/* GET ALL DOCTORS */
app.get("/doctors", async (req, res) => {

    const doctors = await Doctor.find();

    res.json(doctors);

});

/* ADD DOCTOR */
app.post("/doctors", async (req, res) => {

    const doctor = new Doctor({

        name: req.body.name,
        specialization: req.body.specialization,
        experience: req.body.experience,
        phone: req.body.phone

    });

    await doctor.save();

    res.json({
        message: "Doctor Added Successfully"
    });

});

/* UPDATE DOCTOR */
app.put("/doctors/:id", async (req, res) => {

    await Doctor.findByIdAndUpdate(req.params.id, {

        name: req.body.name,
        specialization: req.body.specialization,
        experience: req.body.experience,
        phone: req.body.phone

    });

    res.json({
        message: "Doctor Updated Successfully"
    });

});

/* DELETE DOCTOR */
app.delete("/doctors/:id", async (req, res) => {

    await Doctor.findByIdAndDelete(req.params.id);

    res.json({
        message: "Doctor Deleted Successfully"
    });

});

/* ===================================== */
/* APPOINTMENT ROUTES */
/* ===================================== */

/* GET APPOINTMENTS */
app.get("/appointments", async (req, res) => {

    const appointments = await Appointment.find();

    res.json(appointments);

});

/* ADD APPOINTMENT */
app.post("/appointments", async (req, res) => {

    const appointment = new Appointment({

        patientName: req.body.patientName,
        doctorName: req.body.doctorName,
        appointmentDate: req.body.appointmentDate,
        disease: req.body.disease

    });

    await appointment.save();

    res.json({
        message: "Appointment Added Successfully"
    });

});

/* DELETE APPOINTMENT */
app.delete("/appointments/:id", async (req, res) => {

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
        message: "Appointment Deleted Successfully"
    });

});

/* ===================================== */
/* BILLING ROUTES */
/* ===================================== */

/* GET BILLS */
app.get("/billing", async (req, res) => {

    const bills = await Billing.find();

    res.json(bills);

});

/* ADD BILL */
app.post("/billing", async (req, res) => {

    const total =
    Number(req.body.doctorFee) +
    Number(req.body.medicineFee);

    const bill = new Billing({

        patientName: req.body.patientName,
        disease: req.body.disease,
        doctorFee: req.body.doctorFee,
        medicineFee: req.body.medicineFee,
        total: total

    });

    await bill.save();

    res.json({
        message: "Bill Generated Successfully"
    });

});

/* DELETE BILL */
app.delete("/billing/:id", async (req, res) => {

    await Billing.findByIdAndDelete(req.params.id);

    res.json({
        message: "Bill Deleted Successfully"
    });

});

/* ===================================== */
/* SERVER */
/* ===================================== */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});