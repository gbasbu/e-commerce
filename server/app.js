const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

// ENG: initialize app & TR: app oluşturma
const app = express();

// ENG: Middlewares & TR: Orta yazılımlar
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
require("./config/passport")(passport);

// ENG: Require database connect & TR: Database bağlantısı
require("./mongo-connection");

// ENG: Bring in the routes & TR: Routes getirildi
const userRouter = require("./routes/api/user")
const addressRouter = require('./routes/api/address')
const productRouter = require('./routes/api/product')
const commentRouter = require('./routes/api/comment')
const basketRouter = require('./routes/api/basket')
const adminRouter = require('./routes/api/admin')

app.use("/api/user", userRouter)
app.use('/api/address', addressRouter)
app.use('/api/product', productRouter)
app.use('/api/comment', commentRouter)
app.use('/api/basket', basketRouter)
app.use('/api/admin', adminRouter)


// ENG: Listening server & TR: Server oluşturma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
