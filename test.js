/* const cities = ["Manchester", "Liverpool"];
cities.push("Cardiff");
console.log(cities); // ["Manchester", "Liverpool", "Cardiff"]
 */

const usersGroups = {
  Group1: { 1: { name: "John" }, 2: { name: "Juan" } },
  Group2: { 1: { name: "Oliver" }, 2: { name: "Martin" } },
};

const groupNames = Object.keys(usersGroups);
console.log(groupNames);
