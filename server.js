const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend Working");
});

/* =========================
   MONGODB CONNECTION
========================= */

//mongoose.connect(process.env.MONGO_URL)
//.then(() => console.log("MongoDB Connected"))
//.catch(err => console.log(err));
/* =========================
   PATIENT MODEL
========================= */

const patientSchema = new mongoose.Schema({

    name: String,
    age: String,
    disease: String,
    phone: String

});

const Patient = mongoose.model("Patient", patientSchema);

/* =========================
   DOCTOR MODEL
========================= */

const doctorSchema = new mongoose.Schema({

    name: String,
    specialization: String,
    experience: String,
    phone: String

});

const Doctor = mongoose.model("Doctor", doctorSchema);

/* =========================
   APPOINTMENT MODEL
========================= */

const appointmentSchema = new mongoose.Schema({

    patientName: String,
    doctorName: String,
    appointmentDate: String,
    disease: String

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

/* =========================
   BILLING MODEL
========================= */

const billingSchema = new mongoose.Schema({

    patientName: String,
    amount: String,
    paymentStatus: String

});

const Billing = mongoose.model("Billing", billingSchema);

/* =========================
   PATIENT ROUTES
========================= */

app.get("/patients", async (req, res) => {

    const patients = await Patient.find();

    res.json(patients);

});

app.post("/patients", async (req, res) => {

    const patient = new Patient(req.body);

    await patient.save();

    res.json(patient);

});

app.delete("/patients/:id", async (req, res) => {

    await Patient.findByIdAndDelete(req.params.id);

    res.json({
        message: "Patient Deleted"
    });

});

/* =========================
   DOCTOR ROUTES
========================= */

app.get("/doctors", async (req, res) => {

    const doctors = await Doctor.find();

    res.json(doctors);

});

app.post("/doctors", async (req, res) => {

    const doctor = new Doctor(req.body);

    await doctor.save();

    res.json(doctor);

});

app.delete("/doctors/:id", async (req, res) => {

    await Doctor.findByIdAndDelete(req.params.id);

    res.json({
        message: "Doctor Deleted"
    });

});

/* =========================
   APPOINTMENT ROUTES
========================= */

app.get("/appointments", async (req, res) => {

    const appointments = await Appointment.find();

    res.json(appointments);

});

app.post("/appointments", async (req, res) => {

    const appointment = new Appointment(req.body);

    await appointment.save();

    res.json(appointment);

});

app.delete("/appointments/:id", async (req, res) => {

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
        message: "Appointment Deleted"
    });

});

/* =========================
   BILLING ROUTES
========================= */

app.get("/billings", async (req, res) => {

    const billings = await Billing.find();

    res.json(billings);

});

app.post("/billings", async (req, res) => {

    const billing = new Billing(req.body);

    await billing.save();

    res.json(billing);

});

app.delete("/billings/:id", async (req, res) => {

    await Billing.findByIdAndDelete(req.params.id);

    res.json({
        message: "Billing Deleted"
    });

});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});