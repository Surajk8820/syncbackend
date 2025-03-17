const express = require("express");
const connectDB = require("./database/server");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cityData = require("./CityData");
const UserRoute = require("./routes/auth.routes");
const authentication = require("./middlewares/authentication");

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(cityData);
});

app.use("/api/auth", UserRoute);

// routes for dashboard
app.get("/api/dashboard", authentication, (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : cityData.length;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const totalPages = Math.ceil(cityData.length / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = cityData.slice(startIndex, endIndex);

    res.status(200).send({
      success: true,
      data: paginatedData,
      pagination: req.query.limit
        ? {
            totalPages: totalPages,
            limitPerPage: limit,
            currentPage: page,
          }
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, async () => {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
  }
  console.log("server is running");
});
