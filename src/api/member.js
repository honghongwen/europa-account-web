import request from '@/utils/request'

export function addMember(data) {
  return request({
    url: '/member/add',
    method: 'post',
    data
  })
}

export function editMember(data) {
  return request({
    url: '/member/edit',
    method: 'post',
    data
  })
}


export function delMember(data) {
  return request({
    url: '/member/del',
    method: 'post',
    data
  })
}


export function listMember(data) {
  return request({
    url: '/member/list',
    method: 'post',
    data
  })
}
