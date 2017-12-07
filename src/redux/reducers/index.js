import auth from './auth'
import { reducer as awaitReducer } from 'redux-await'
import { reducer as reduxForm } from 'redux-form'
import stationBurialAction from ''

export default {
  auth,
  await: awaitReducer,
  form: reduxForm
}
