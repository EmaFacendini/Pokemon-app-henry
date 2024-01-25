const { Router } = require('express');

const getById = require("../controllers/getByID");
const addPokemon = require("../controllers/addNewPokemon")
const getByName = require("../controllers/getByName")

const getAllPokemons = require('../controllers/getAllPokemons');

const router = Router();

router.get("/:idPokemon", getById)
router.post("/", addPokemon )
router.get("/", getByName )
router.get("", getAllPokemons)

module.exports = router;