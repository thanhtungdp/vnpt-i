import { UPDATE_USER_INFO } from '../actions/authAction'
import update from 'react-addons-update'

const initialState = {
  isAuthenticated: false,
  token: null,
  userInfo: {
    username: '',
    fullname: ''
  }
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return updateUserInfo(state, action)
    default:
      return state
  }
}

export function updateUserInfo(state, { auth }) {
  return update(state, {
    isAuthenticated: {
      $set: true
    },
    token: {
      $set: auth.token
    },
    userInfo: {
      username: {
        $set: auth.username
      },
      fullnae: {
        $set: auth.fullname
      }
    }
  })
}
