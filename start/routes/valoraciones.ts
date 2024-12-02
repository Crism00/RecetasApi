const ValoracionesController = () => import('#controllers/valoraciones_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.resource('/valoraciones', ValoracionesController).use('*', middleware.auth())
