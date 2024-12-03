const ComentariosController = () => import('#controllers/comentarios_controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.resource('/comentarios', ComentariosController).use('*', middleware.auth())
