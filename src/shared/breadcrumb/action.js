export const ADD_BREADCRUMB = 'BREADCRUMB/add-breadcrumb'
export const UPDATE_BREADCRUMB = 'BREADCRUMB/update-breadcrumb'
export const DELETE_BREADCRUMB = 'BREADCRUMB/delete-breadcrumb'

export function addBreadcrumb(breadcrumb) {
  return {
    type: ADD_BREADCRUMB,
    breadcrumb
  }
}

export function updateBreadcrumb(breadcrumb) {
  return {
    type: UPDATE_BREADCRUMB,
    breadcrumb
  }
}

export function deleteBreadcrumb(breadcrumb) {
  return {
    type: DELETE_BREADCRUMB,
    breadcrumb
  }
}

export default {
  addBreadcrumb,
  updateBreadcrumb,
  deleteBreadcrumb
}
