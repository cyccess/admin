import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/orgauth/api/sysPermissions',
  sysRoleConfigs: '/orgauth/api/sysRoles',
  orgSysDepartmentQuery: '/org/api/availableSysDepartments/search/findByParentNull?projection=uitree',
  orgSysDepartment: '/org/api/availableSysDepartments',
  orgSysJob: '/org/api/availableSysJobs',
  orgSysUser: '/org/api/availableSysUsers',
  orgSysCompanies: '/org/api/availableCompanies'
}

export default api

export function getRoleList (parameter) {
  return axios({
    url: api.sysRoleConfigs,
    method: 'get',
    params: parameter
  })
}

export function createRole (parameter) {
  return axios({
    url: api.sysRoleConfigs + (parameter.id === 0 ? '' : '/' + parameter.id),
    method: parameter.id === 0 ? 'post' : 'patch',
    data: parameter
  })
}

export function deleteRole (parameter) {
  return axios({
    url: api.sysRoleConfigs + '/' + parameter.id,
    method: 'delete',
    data: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}
export function savePermissions (parameter) {
  return axios({
    url: api.sysRoleConfigs + `/${parameter.id || ''}`,
    method: parameter.id === 0 ? 'post' : 'patch',
    data: parameter
  })
}

export const getOrgSysDepartment = parameter => {
  return axios({
    url: api.orgSysDepartmentQuery,
    method: 'get',
    params: parameter
  })
}

export const saveOrgSysDepartment = parameter => {
  return axios({
    url: api.orgSysDepartment + `/${parameter.key || ''}`,
    method: parameter.key ? 'patch' : 'post',
    data: parameter
  })
}

export function deleteOrgSysDepartment (parameter) {
  return axios({
    url: api.orgSysDepartment + '/' + parameter.id,
    method: 'delete',
    data: parameter
  })
}

// ------------------company Begin--------------------------

export const getOrgCompanies = parameter => {
  return axios({
    url: api.orgSysCompanies,
    method: 'get',
    params: parameter
  })
}

export const saveOrgCompany = parameter => {
  return axios({
    url: api.orgSysCompanies + `/${parameter.id || ''}`,
    method: parameter.id ? 'patch' : 'post',
    data: parameter
  })
}

export function deleteOrgCompany (parameter) {
  return axios({
    url: api.orgSysCompanies + '/' + parameter.id,
    method: 'delete',
    data: parameter
  })
}

// ------------------company End--------------------------

export const getOrgUsers = parameter => {
  return axios({
    url: api.orgSysUser,
    method: 'get',
    params: parameter
  })
}

export const getOrgJobs = parameter => {
  return axios({
    url: api.orgSysJob,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}
