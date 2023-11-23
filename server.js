const app = require("./app");
const { connectDB } = require("./db")

const PORT = process.env.PORT || 3000;
const connectServer = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

connectDB().then(connectServer)


