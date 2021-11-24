import request from '@/utils/request'

//
export function getMaster(key) {
  return request({
    url: '/BPList/getMaster',
    method: 'get',
    params: {keyName:key},
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

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
export function getSalesList() {
  return request({
    url: '/BPList/getSalesList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//获取CompanyList(检索用)
export function getCompanyList() {
  return request({
    url: '/BPList/getCompanyList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//获取prjList(检索用)
export function getPrjList() {
  return request({
    url: '/BPList/getPrjList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//获取CustpsnList(检索用)
export function getCustpsnList() {
  return request({
    url: '/BPList/getCustpsnList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//获取PersonList(检索用)
export function getPersonList() {
  return request({
    url: '/BPList/getPersonList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}


//根据条件检索BPList
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

//删除一条BP数据
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
//获取全部contactList
export function contactInitList() {
  return request({
    url: '/BPList/getcntList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//根据条件检索contactList
export function contactSearch(query) {
  return request({
    url: '/BPList/getContactSearch',
    method: 'get',
    params: query,
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//删除一条Contact数据
export function DeleteContact(id) {
  return request({
    url: '/BPList/deleteContactById',
    method: 'get',
    baseURL: '/backend', // 直接通过覆盖的方式
    params: {id}
  })
}

//更新当前contact信息
export function updateContact(data) {
  return request({
    url: '/BPList/contactUpdate',
    method: 'post',
    baseURL: '/backend', // 直接通过覆盖的方式
    data
  })
}


//新增一条Contact数据
export function createContact(data) {
  return request({
    url: '/BPList/createContact',
    method: 'post',
    baseURL: '/backend', // 直接通过覆盖的方式
    data
  })
}

//获取CustomList
export function getCustomList() {
  return request({
    url: '/BPList/getCustomList',
    method: 'get',
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}

//删除一条Custom数据
export function DeleteCustom(id) {
  return request({
    url: '/BPList/deleteCustomById',
    method: 'get',
    baseURL: '/backend', // 直接通过覆盖的方式
    params: {id}
  })
}

//更新一条Custom数据
export function customUpdate(data) {
  return request({
    url: '/BPList/customUpdate',
    method: 'post',
    baseURL: '/backend', // 直接通过覆盖的方式
    data
  })
}
//根据条件检索CustomList
export function CustomSearch(query) {
  return request({
    url: '/BPList/CustomSearch',
    method: 'get',
    params: query,
    baseURL: '/backend' // 直接通过覆盖的方式
  })
}


//新增一条Contact数据
export function createCustom(data) {
  return request({
    url: '/BPList/createCustom',
    method: 'post',
    baseURL: '/backend', // 直接通过覆盖的方式
    data
  })
}