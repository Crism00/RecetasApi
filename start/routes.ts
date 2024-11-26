/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import './routes/api.js'
import './routes/categorias.js'
import './routes/recetas.js'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})
