const express = require("express");
const app = express();
const port = 3000;

const usersGroups = {
  Group1: { 1: { name: "John" }, 2: { name: "Juan" } },
  Group2: { 1: { name: "Oliver" }, 2: { name: "Martin" } },
};

const sendGreeting = async (user) => {
  return new Promise((resolve) => {
    const delay = Math.random() * 1000;

    setTimeout(() => {
      const greeting = `Hola, ${user.name}!`;
      console.log(greeting);
      resolve(greeting);
    }, delay);
  });
};

const sendGreeting2 = (user) => {
  const greeting = `Hola, ${user.name}!`;
  console.log(greeting);
  return greeting;
};

app.get("/saludo/:groupName", (req, res) => {
  const groupName = req.params.groupName;
  const group = usersGroups[groupName];

  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }
  const userIds = Object.keys(group);
  const greetings = [];

  for (const userId of userIds) {
    greetings.push(sendGreeting2(group[userId]));
  }

  res.json({
    group: groupName,
    greetings: greetings,
  });
});

app.get("/saludatodos", async (req, res) => {
  try {
    const groupNames = Object.keys(usersGroups);
    const allGreetings = {};

    for (const groupName of groupNames) {
      const group = usersGroups[groupName];
      const userIds = Object.keys(group);

      const greetingPromises = userIds.map((userId) =>
        sendGreeting(group[userId])
      );

      allGreetings[groupName] = await Promise.all(greetingPromises);
    }

    res.json(allGreetings);
  } catch (error) {
    console.error("Error sending greetings to all groups:", error);
    res.status(500).json({ error: "Failed to send greetings to all groups" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
