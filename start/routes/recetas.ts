const RecetasController = () => import('#controllers/recetas_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// Ruta para listar recetas, con el parámetro opcional de categoría
router.get('/recetas', [RecetasController, 'index']).middleware(middleware.auth())

// Ruta para crear una receta
router.post('/recetas', [RecetasController, 'store']).middleware(middleware.auth())

// Ruta para actualizar una receta
router.put('/recetas/:id', [RecetasController, 'update']).middleware(middleware.auth())

router.get('/recetas/user', [RecetasController, 'getUserRecipes']).middleware(middleware.auth())

router.get('/recetas/:id', [RecetasController, 'show']).middleware(middleware.auth())

router.get('/recetas/top', [RecetasController, 'getTop5Recipes']).middleware(middleware.auth())
