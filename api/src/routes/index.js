const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoute = require('./pokemonRoutes')
const typeRoute = require('./typeRoutes')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRoute);
router.use('/types', typeRoute);


module.exports = router;
