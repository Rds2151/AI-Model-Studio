const express = require('express');
const app = express();
const cors = require('cors');
const indexRouter = require("./routes/index");

const port = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
