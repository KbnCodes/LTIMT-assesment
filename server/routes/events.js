const express = require("express");
const fs = require("fs");
const router = express.Router();

router.use(express.json());

// Event creation route
router.post("/", (req, res) => {
  // Check user session
  const { user } = req.session;
  //   if (!user) {
  //     res.status(401).send('Unauthorized');
  //     return;
  //   }

  const { eventName, eventDate, eventDescription, price, bookingType, terms } =
    req.body;

  // Create event record
  const newEvent = {
    eventName,
    eventDate,
    eventDescription,
    price,
    bookingType,
    terms,
    createdBy: user,
    createdAt: new Date(),
  };

  fs.readFile("events.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const json = JSON.parse(data);
      json.push(newEvent);
      fs.writeFile("events.json", JSON.stringify(json), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("Event created successfully");
        }
      });
    }
  });
});

// Get events created by user
router.get("/", (req, res) => {
  // Check user session
  const { user } = req.session;

  fs.readFile("events.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const json = JSON.parse(data);
      const userEvents = json.filter((event) => event.createdBy === user);
      res.send(userEvents);
    }
  });
});

// Update event route
router.put("/events/:id", (req, res) => {
  // Get the event ID from the request URL parameters
  const eventId = req.params.id;

  // Find the event in the database or JSON file
  const eventIndex = events.findIndex((e) => e.createdAt === eventId);

  // Update the event properties from the request body
  events[eventIndex].eventName = req.body.name;
  events[eventIndex].eventDate = req.body.date;
  events[eventIndex].eventDescription = req.body.description;
  events[eventIndex].price = req.body.price;
  events[eventIndex].bookingType = req.body.bookingType;

  // Save the updated events array to the JSON file
  fs.writeFile("./events.json", JSON.stringify(events), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send("Event updated successfully");
  });
});

router.put("/:id", (req, res) => {
  // Read the events data from the JSON file
  const events = JSON.parse(fs.readFileSync("./events.json"));

  // Find the index of the event with the given ID
  const eventIndex = events.findIndex((e) => e.createdAt === req.params.id);

  if (eventIndex === -1) {
    res.status(404).send("Event not found");
    return;
  }

  // Update the event with the provided data
  events[eventIndex].eventName = req.body.name;
  events[eventIndex].eventDate = req.body.date;
  events[eventIndex].eventDescription = req.body.description;
  events[eventIndex].price = req.body.price;
  events[eventIndex].bookingType = req.body.bookingType;

  // Save the updated events array to the JSON file
  fs.writeFile("./events.json", JSON.stringify(events), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }

    res.send(events[eventIndex]);
  });
});

router.delete("/:id", (req, res) => {
  // Read the events data from the JSON file
  const events = JSON.parse(fs.readFileSync("./events.json"));

  // Find the index of the event with the given ID
  const eventIndex = events.findIndex((e) => e.createdAt === req.params.id);

  if (eventIndex === -1) {
    res.status(404).send("Event not found");
    return;
  }

  // Remove the event from the events array
  const deletedEvent = events.splice(eventIndex, 1)[0];

  // Save the updated events array to the JSON file
  fs.writeFile("./events.json", JSON.stringify(events), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }

    res.send(deletedEvent);
  });
});

module.exports = router;
