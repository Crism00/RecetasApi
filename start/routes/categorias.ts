const CategoriasController = () => import('#controllers/categorias_controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.resource('/categorias', CategoriasController).use('*', middleware.auth())
