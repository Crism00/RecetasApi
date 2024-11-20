const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
