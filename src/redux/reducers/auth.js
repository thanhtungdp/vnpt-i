import {
  UPDATE_USER_INFO,
  FETCH_SUCCESS_USER,
  FETCH_PENDING_USER,
  FETCH_FAIL_USER,
  USER_LOGOUT
} from '../actions/authAction'
import update from 'react-addons-update'

const initialState = {
  isAuthenticated: false,
  isPending: true,
  isFail: false,
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
    case FETCH_SUCCESS_USER:
      return fetchSuccessUser(state, action)
    case FETCH_FAIL_USER:
      return fetchFailUser(state)
    case FETCH_PENDING_USER:
      return fetchPendingUser(state, action)
    case USER_LOGOUT:
      return userLogout(state)
    default:
      return state
  }
}

export function userLogout(state){
  return update(state, {
    isAuthenticated: {
      $set: false,
    }
  })
}

export function fetchPendingUser(state) {
  return update(state, {
    isPending: {
      $set: true
    },
    isFail: {
      $set: false
    }
  })
}

export function fetchSuccessUser(state, { token, auth }) {
  return update(state, {
    isPending: {
      $set: false
    },
    isFail: {
      $set: false
    },
    isAuthenticated: {
      $set: true
    },
    token: {
      $set: token
    },
    userInfo: {
      $set: auth
    }
  })
}

export function fetchFailUser(state) {
  return update(state, {
    isPending: {
      $set: false
    },
    isFail: {
      $set: true
    }
  })
}

export function updateUserInfo(state, { auth: { token, data } }) {
  return update(state, {
    isAuthenticated: {
      $set: true
    },
    token: {
      $set: token
    },
    userInfo: {
      $set: data
    }
  })
}
