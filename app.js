/**
 * Name: Ray Oh
 * Date: May 19, 2022
 * Section: CSE 154 AE
 * This is the javascript file that sends information about my favorite pokemon and also
 * the client's specified pokemon to the website so that it can be displayed.
 */

"use strict";

const express = require("express");
const app = express();
const multer = require("multer");
app.use(multer().none());

let FAVORITE_POKEMON = [149, 350, 448, 330, 257, 384];

app.get("/favorite", (req, res) => {
  res.type('text');
  res.send(getFavoritePokemon());
});

app.get("/specific", (req, res) => {
  let number = req.query.number;

  if (number) {
    if ((number > 0) && (number < 494)) {
      res.type("json");
      res.json({
        "number": number
      });
    } else {
      res.status(400);
      res.type('text');
      res.send("oh snap, body params not set");
    }
  } else {
    res.status(400);
    res.type('text');
    res.send("oh snap, body params not set");
  }
});

/**
 * Returns the list of favorite pokemon
 * @returns {text} a list of favorite Pokemon
 */
function getFavoritePokemon() {
  let result = "";
  for (let i = 0; i < FAVORITE_POKEMON.length; i++) {
    result += FAVORITE_POKEMON[i];
    if (i < FAVORITE_POKEMON.length - 1) {
      result += '\n';
    }
  }
  return result;

}

app.use(express.static("public"));

const PORT = process.env.PORT || 8000;
app.listen(PORT);