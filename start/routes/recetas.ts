const RecetasController = () => import('#controllers/recetas_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// Ruta para listar recetas, con el parámetro opcional de categoría
router.get('/recetas', [RecetasController, 'index']).middleware(middleware.auth())

// Ruta para crear una receta
router.post('/recetas', [RecetasController, 'store']).middleware(middleware.auth())

// Ruta para actualizar una receta
router.put('/recetas/:id', [RecetasController, 'update']).middleware(middleware.auth())
