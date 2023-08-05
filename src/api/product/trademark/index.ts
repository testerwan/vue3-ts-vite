import request from '@/utils/request.ts'
import { TradeMark } from '@/api/product/trademark/type.ts'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove',
}
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}

export const reqDeleteTrademark = (id: number) =>
  request.delete(API.DELETE_URL + '/' + id)
