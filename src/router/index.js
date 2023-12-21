import { createRouter, createMemoryHistory } from 'vue-router'
import PersonalInfoView from '../views/PersonalInfoView.vue'
import SelectPlanView from '../views/SelectPlanView.vue'
import PickAddView from '../views/PickAddView.vue'
import ConfirmView from '../views/ConfirmView.vue'
import FinalView from '../views/FinalView.vue'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component:  PersonalInfoView,
    },
    {
      path: '/',
      name: 'login',
      component: SelectPlanView,
    },
    {
      path: '/login',
      name: 'createuser',
      component: PickAddView,
    }
  ]
})


router.beforeEach((to,from,next) =>{
  const auth = useAuth()
  const isAuth = auth.token

  if (to.meta.requireAuth && isAuth === null) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router
