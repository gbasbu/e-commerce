const mongoose = require("mongoose");
const db = require("./config/keys.js").mongoURI;

// ENG: Async database connection & TR: Asenkron database bağlantısı
async function main() {
  await mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`Connected database on ${db}`);
    })
    .catch((err) => {
      console.log(`Error connection database: ${err}`);
    });
}

main();
