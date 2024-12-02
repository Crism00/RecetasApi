const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/authUser', [AuthController, 'infoAuthUser']).use(middleware.auth())
router.put('/update', [AuthController, 'update']).use(middleware.auth())
