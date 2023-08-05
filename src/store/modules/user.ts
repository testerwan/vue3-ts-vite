import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts'
import { constantRoute } from '@/router/routes.ts'

let useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  //异步|逻辑的地方
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        console.log(result)
        return 'ok'
      } else {
        // @ts-ignore
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      let result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    async userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})
export default useUserStore
