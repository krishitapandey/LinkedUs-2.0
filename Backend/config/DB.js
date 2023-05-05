import mongoose from "mongoose";

const uri = "mongodb+srv://krishita:kiskid123@cluster0.ygfl7qi.mongodb.net/Linkedin?retryWrites=true&w=majority";

const connect = () => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((error) => {
      console.log("Cannot connect to the database!", error);
      process.exit();
    });
};

export default connect;
