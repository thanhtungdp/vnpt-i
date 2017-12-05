import reducer from './reducer'

export default function createReducer({ locale, data }) {
  const initialState = {
    locale,
    data
  }
  return (state = initialState, action) => reducer(state, action)
}
