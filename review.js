const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb+srv://abelajaladeborah_db_user:UmiAZhQwl5cjsdhz@cluster0.ikphzpy.mongodb.net/catDB?retryWrites=true&w=majority")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

// Schema & Model
const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model("Cat", kittySchema);

// SERVER STATUS
app.get("/api/server/status", (req, res) => {
    res.json({ msg: "Server is up and ready" });
});


// ================= CRUD =================

// CREATE (Add a cat)
app.post("/api/cats", async (req, res) => {
    try {
        const newCat = new Kitten({
            name: req.body.name
        });

        await newCat.save();
        res.json({ msg: "Cat created", data: newCat });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (Get all cats)
app.get("/api/cats", async (req, res) => {
    try {
        const cats = await Kitten.find();
        res.json(cats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (Get one cat by ID)
app.get("/api/cats/:id", async (req, res) => {
    try {
        const cat = await Kitten.findById(req.params.id);
        res.json(cat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE (Update a cat)
app.put("/api/cats/:id", async (req, res) => {
    try {
        const updatedCat = await Kitten.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );

        res.json({ msg: "Cat updated", data: updatedCat });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE (Delete a cat)
app.delete("/api/cats/:id", async (req, res) => {
    try {
        await Kitten.findByIdAndDelete(req.params.id);
        res.json({ msg: "Cat deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// START SERVER
app.listen(PORT, () => {
    console.log("API is listening on Port:", PORT);
});