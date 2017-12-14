import auth from './auth'
import { reducer as awaitReducer } from 'redux-await'
import { reducer as reduxForm } from 'redux-form'

export default {
  auth,
  await: awaitReducer,
  form: reduxForm
}
