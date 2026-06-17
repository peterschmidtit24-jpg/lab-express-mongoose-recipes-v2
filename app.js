const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
      // receive data from the client
    console.log("body = ", req.body)

    const newRecipe = new Recipe(req.body);

    await Recipe.create(newRecipe)
        .then((recipe) => {
            console.log("recipe = ", recipe)
            res.send(`recipe ${recipe.title} created.`)
        })
        .catch((error) => {
            console.log("error = ", error)  
            res.status(500).send(error)
        })
        .finally(() => {
            console.log("recipe created")
    })

    res.status(201).json(req.body);
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    await Recipe.find()
        .then((recipes) => {
            console.log("recipes = ", recipes)
            res.json(recipes)
        })
        .catch((error) => {
            console.log("error = ", error)  
            res.status(500).send(error)
        })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
    
    await Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            console.log("recipe = ", recipe)
            res.json(recipe)
        })
        .catch((error) => {
            console.log("error = ", error)  
            res.status(500).send(error)
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res) => {
    
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body)
        .then((recipe) => {
            console.log("recipe = ", recipe)
            res.json(recipe)
        })
        .catch((error) => {
            console.log("error = ", error)  
            res.status(500).send(error)
        })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res) => {
    
    await Recipe.findByIdAndDelete(req.params.recipeId)
        .then((recipe) => {
            console.log("recipe = ", recipe)
            res.json(recipe)
        })
        .catch((error) => {
            console.log("error = ", error)  
            res.status(500).send(error)
        })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
