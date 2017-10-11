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
    default:
      return state
  }
}
