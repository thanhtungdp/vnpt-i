import update from 'react-addons-update'
import {
  ADD_BREADCRUMB,
  UPDATE_BREADCRUMB,
  DELETE_BREADCRUMB
} from '../breadcrumb/action'

type Breadcrumb = {
  id: string,
  icon: string,
  name: string,
  href: string
}

type ActionType = {
  type: string,
  breadcrumb: Breadcrumb
}

type BreadcrumbState = Array<Breadcrumb>

const initialState: BreadcrumbState = []

export default function createReducer (
  state: BreadcrumbState = initialState,
  action: ActionType
): Array<Breadcrumb> {
  switch (action.type) {
    case ADD_BREADCRUMB:
      return addBreadcrumb(state, action)
    case UPDATE_BREADCRUMB:
      return updateBreadcrumb(state, action)
    case DELETE_BREADCRUMB:
      return deleteBreadcrumb(state, action)
    default:
      return state
  }
}

export function addBreadcrumb (state, { breadcrumb }): BreadcrumbState {
  return update(state, {
    $push: [breadcrumb]
  })
}

export function updateBreadcrumb (state, { breadcrumb }): BreadcrumbState {
  const breadcrumbIndex = state.findIndex(b => b.id === breadcrumb.id)
  return update(state, {
    [breadcrumbIndex]: {
      $apply: oldBreadcrumb => ({
        ...oldBreadcrumb,
        ...breadcrumb
      })
    }
  })
}

export function deleteBreadcrumb (state, { breadcrumb }): BreadcrumbState {
  const breadcrumbIndex = state.findIndex(b => b.id === breadcrumb.id)
  return update(state, {
    $splice: [[breadcrumbIndex, 1]]
  })
}
