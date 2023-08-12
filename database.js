const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cd) => {
    MongoClient.connect("mongodb://localhost:27017/Practice")
      .then((client) => {
        dbConnection = client.db();
        return cd();
      })
      .catch((error) => {
        console.log("error connecting database", error);
        return cd(error);
      });
  },
  getDb: () => dbConnection,
};
