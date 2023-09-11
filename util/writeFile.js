const fs = require("fs");
const path = require("path");
module.exports = (data) => {
  try {
    fs.writeFileSync(
      "/home/pattrick/Desktop/Workspace/webdev/NodeJS/crud_api_project/dummyData/data.json", 
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};
