const uuid = require('uuid/v4');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://hirurana:uclengvid123@comp103p-rntjm.mongodb.net/";

// const projects = [
//   {
//     id: "6f404e57-4407-4849-bec3-689ef714a206",
//     projectName: "Project 1",
//     projectManager: "Bob Smith",
//     teamMembers: "John Doe, Sangay",
//     managerNum: "+447912345678",
//     email: "bob.smith.17@ucl.ac.uk",
//     approver: "Cyrus Horban",
//     check_subtitles: "true",
//     videoURL: "https://www.youtube.com/watch?v=5IWxISz7vYk"
//   },
//   {
//     id: "12b1ac1f-cf6c-4919-bd25-1cd9dd918b75",
//     projectName: "Project 2",
//     projectManager: "Medi-Remi Hashim",
//     teamMembers: "John Doe, Yacoub Ahmed",
//     managerNum: "+447912345678",
//     email: "john.doe.17@ucl.ac.uk",
//     approver: "Cyrus Horban",
//   }
// ]
//
// exports.getProjects = () => {
//   return projects
// }
//
// exports.getProject = (id) => {
//   for (let i = 0; i < projects.length; i++) {
//     if (projects[i].id == id) return projects[i]
//   }
//   return null
// }
//
// exports.createProject = (projectName) => {
//   const projectID = uuid()
//   projects.push({
//     id: projectID,
//     projectName
//   })
//   return projectID
// }
//
// exports.editProject = (projectID, data) => {
//   console.log(projectID)
//   for (let i = 0; i < projects.length; i++) {
//     if (projects[i].id == projectID) {
//       projects[i] = data
//       projects[i].id = projectID
//       console.log("Saved.", projects[i])
//     }
//   }
// }

exports.loadProjects = (upi) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("comp103");

    var query = { _id: upi};
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      // if we get a result then get the data json
      if (result.length != 0) {
        projects = result[0].projectIDs;
        // returns an array with data for each project, just like last time
        var content = getProjectData(projects);
      } else {
        // if upi does not exist then create a document and a blank project for it.
        createNewUser(upi, projectID);
      }
    });
  });
}

exports.saveProject = (projectID, data) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("comp103");

    var searchProject = { _id: projectID};
    var newValues = { $set: data};

    dbo.collection("projects").updateOne(searchProject, newValues, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
}

exports.deleteProject = (upi, projectID) => {
  // TODO: do it
}

exports.createProject = (upi) => {
  // TODO: do it
}

function getProjectData(projects) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("comp103");
    var content = new Array();

    for (var i in projects){
      dbo.collection("projects").find({ _id: String(projects[i])}).toArray(function(err, result) {
        if (err) throw err;
        content.push(result[0].data);
        if (content.length == array.length) {
          db.close();
          return content;
        }
      });
    }
  });

}

function createNewUser(upi) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("comp103");

    // generate a projectID
    const projectID = uuid();

    // insert into users
    var usersObj = {
      _id: upi,
      projectIDs: [projectID]
    }
    var projectsObj = {
      _id: projectID,
      data: {
        projectName: "Untitled-1"
      }
    }

    dbo.collection("users").insertOne(usersObj, function(err, res) {
      if (err) throw err;
    });

    dbo.collection("projects").insertOne(projectsObj, function(err, res) {
      if (err) throw err;
    });
    db.close();
  });
}


// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("comp103");
//
//
// })
