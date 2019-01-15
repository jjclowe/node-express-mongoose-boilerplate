const express = require("express");
const router = express.Router();
const database = require("../test-data");

router.get("/:object(contacts)/:id?", (req, res) => {
  var { object, id } = req.params;
  var { contacts } = database;
  var { filter } = req.query;

  var response = [];

  switch (object) {
    case "contacts":
      response = contacts.filter(contact => {
        if (id) {
          return contact._id == req.params.id;
        } else {
          return (
            contact.name.toLowerCase().includes(filter) ||
            contact.role.toLowerCase().includes(filter) ||
            contact.company.toLowerCase().includes(filter) ||
            !filter
          );
        }
      });

      res.json(id ? response[0] : response);
      break;
  }
});

module.exports = router;
