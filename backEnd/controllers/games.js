const util = require('util');

const db = require("../model/index.js");

const router = require("express").Router();


// returns all game reviews
// !! IMPORTANT !! - Best practice is not have 2 or more routes with the same path
// Example: "/" for this GET [router.get("/"...)] and other POST [router.post("/" ...)]
router.get("/", async (req, res) => {
  console.log("get all games");
  db.select('*')
    .from('reviews')
    .then((data) =>
          {
            console.log("returning all game reviews: " + util.inspect(data, true, null, true /* enable colors */));
            res.json(data);
          })
    .catch((err) => {
            console.log(err);
            res.json({"Error":"error occurred"})
          });
});


//update single game review by id
// !! IMPORTANT !! - Best practice is not have 2 or more routes with the same path
// Example: "/:id" for this POST [router.post("/:id"...)], GET [router.get("/:id"...)] and DELETE [router.delete("/:id"...)]
router.post("/:id", (req, res) => {
  console.log("update game review");
  console.log("req.params.id = " + req.params.id);
  console.log("req.body: " + util.inspect(req.body, true, null, true /* enable colors */));
  const changes = req.body;
  const id = req.params.id;
  db("reviews")
    .where("id", "=", id)
    .update(changes)
    .then(() => {
      console.log("updated game review");
      return res.redirect("http://localhost:3000/");  //this actual sets the url in the address bar on the client browser to this
    })
    .catch((err) => {
      console.log(err);
    });
});


//return a single game review by id
// !! IMPORTANT !! - Best practice is not have 2 or more routes with the same path
// Example: "/:id" for this GET [router.get("/:id"...)], POST [router.post("/:id"...)] and DELETE [router.delete("/:id"...)]
router.get("/:id", (req, res) => {
  console.log("return game");
  //variable name is id,
  //equal sign means we are having the variable whose name is id having
  //the value of what is in the req.params.id variable
  const id = req.params.id;
  console.log("id: " + id);
  db.select("*")
    .from("reviews")
    .where("id", "=", id)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


//delete single game review by id
// !! IMPORTANT !! - Best practice is not have 2 or more routes with the same path
// Example: "/:id" for this DELETE [router.delete("/:id"...)], GET [router.get("/:id"...)] and POST [router.post("/:id"...)]
router.delete("/:id", (req, res) => {
  console.log("delete game review");
  const id = req.params.id;
  const gameIdToDelete = Number(id);
  console.log(gameIdToDelete);
  db("reviews")
    .where("id", "=", gameIdToDelete)
    .del()
    .then(() => {
      console.log("game review deleted");
      return res.redirect(202,"http://localhost:3000/", );  //this actual sets the url in the address bar on the client browser to this
    })
    .catch((err) => {
      console.log(err);
      return res.redirect(202,"http://localhost:3000/");  //this actual sets the url in the address bar on the client browser to this
    });
});


//add one single game review
/*
 Example Input:
 {
    "gameName": "tetris",
    "gameUrl": "www..tetris.com",
    "gameRating": "6"
 }
*/
// !! IMPORTANT !! - Best practice is not have 2 or more routes with the same path
// Example: "/:id" for this POST [router.post("/"...)] and other GET [router.get("/"...)]
router.post("/", async (req, res) => {
  console.log("add one game review");
  console.log("req.body: " + util.inspect(req.body, true, null, true /* enable colors */));
  const maxIdQuery = await db("reviews").select("id").orderByRaw("to_number(id,'999999999') DESC").first();
  if (maxIdQuery === undefined)
  {
    maxId = "0";
   console.log("No data exists, using initial id of 0");
  }
  else
  {
    maxId = maxIdQuery.id;
    console.log("maxIdQuery : " + JSON.stringify(maxIdQuery));
  }
  console.log("current max id: " + maxId);
  const { gameName, gameUrl, gameRating } = req.body;
  console.log("Data: gameName: " + gameName + ", gameUrl: " + gameUrl + ", gameRating: " + gameRating);
  db("reviews")
    .insert({
      name: gameName,
      url: gameUrl,
      rating: gameRating,
      id: (parseInt(maxId)+1)
    })
    .then(() => {
      console.log("game review added");
      // res.json(data);
      // return res.json({ msg: "gameReviews added" });
      return res.redirect("http://localhost:3000/");  //this actual sets the url in the address bar on the client browser to this
    })
    .catch((err) => {
	    console.log("ERROR OCCURRED: COULD NOT ADD GAME REVIEW");
      console.log(err);
      //return res.json({ "error": err})
    });

});

//add one single game review by id
/*
router.post("/", async (req, res) => {
  console.log("add one game review");
  const { gameName, gameUrl, gameRating } = req.body;
  console.log("req.body: " + JSON.stringify(req.body));
  const maxIdQuery = await db("reviews")
    .select("id2")
    .orderByRaw("id DESC")
    .first();
  if (maxIdQuery === undefined)
  {
    maxId = 1;
   console.log("No data exists, seeting initial id to 1");
  }
  else
  {
    maxId = maxIdQuery.id2;
    console.log("maxIdQuery : " + JSON.stringify(maxIdQuery));
  }
  db("reviews")
    .insert({
      name: gameName,
      url: gameUrl,
      rating: gameRating,
      id: parseInt(maxId) + 1,
    })
    .then(() => {
      console.log("gameRevies added");
      return res.redirect("http://localhost:3000/"); //this actual sets the url in the address bar on the client browser to this
    })
    .catch((err) => {
      console.log(err);
    });
});
*/

module.exports = router;
