const { Router } = require('express');

const getById = require("../controllers/getByID");
const addPokemon = require("../controllers/addNewPokemon")
const getByNamehandler = require("../handlers/GetByNameHandler")

const {getAllPokemons} = require('../controllers/getAllPokemons');

const router = Router();

router.get("/:idPokemon", getById)
router.post("/", addPokemon )
router.get("/", getByNamehandler )
router.get("", getAllPokemons)

module.exports = router;