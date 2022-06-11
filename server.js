const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  //me dirige a la ruta del index.html
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  const a = JSON.stringify(messages);

  response.send(a);
});
app.get("/messages/:id", function (request, response) {
  const id = Number(request.params.id);

  let a = messages.find((message) => message.id === id);

  response.send(a);
});

app.delete("/messages/:id", function (request, response) {
  const id = Number(request.params.id);

  let a = messages.findIndex((message) => message.id === id);
  messages.splice(a, 1);

  response.send();
});

app.post("/messages", function (request, response) {
  const from = request.body.from;
  const text = request.body.text;

  from === "" || text === ""
    ? response
        .status(400)
        .send({
          message: "The objects have an empty or missing text or from property",
        })
    : messages.push({ id: messages.length, from, text });

  const a = JSON.stringify(messages);

  /*  

   */
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
