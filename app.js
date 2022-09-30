const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Contacts API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /contacts:
 *   get:
 *      description: Get all contacts
 *      responses:
 *          200:
 *            description: Success
 */

app.get("/contacts", (req, res) => {
  res.send([
    {
      name: "John Doe",
      company: "Microsoft",
      email: "john@microsoft.com",
      phone: "369-555-55555",
    },
  ]);
});

/**
 * @swagger
 * /contact:
 *    post:
 *      description: Get one contact
 *      parameters:
 *      - name: name
 *        description: Contact name
 *        in: body
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: Success
 */

app.post("/contact", (req, res) => {
  const name = req.body.title;
  res.send({ name });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
