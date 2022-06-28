import router from "./router"
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import store from "./store"
import {
  Message
} from "element-ui"

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.state.token.token) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.error('token失效，请重新登陆')
      next('/login')
      NProgress.done()
    }
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})
