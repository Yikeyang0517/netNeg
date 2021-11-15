import request from '@/utils/request'

//获取BPList
export function fetchList(query) {
  return request({
    url: '/BPList/getBPList',
    method: 'get',
    params: query,
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}
//获取营业负责人List(检索用)
export function searchItemSales() {
  return request({
    url: '/BPList/getSalesList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//根据条件检索
export function searchBP(query) {
  return request({
    url: '/BPList/getSearch',
    method: 'get',
    params: query,
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}
//更新当前BP信息
export function updateArticle(data) {
  return request({
    url: '/BPList/dataUpdate',
    method: 'post',
    baseURL: '/backend', // 直接通过覆盖的方式
    data
  })
}

//删除一条数据
export function DeleteBP(query) {
  return request({
    url: '/BPList/deleteById',
    method: 'get',
    baseURL: '/backend', // 直接通过覆盖的方式
    params: query
  })
}

//新增一条BP数据
export function createArticle(data) {
  return request({
    url: '/BPList/createData',
    method: 'post',
    baseURL: '/backend', // 直接通过覆盖的方式
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}
