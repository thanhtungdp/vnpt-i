import auth from './auth'
import { reducer as awaitReducer } from 'redux-await'
import { reducer as reduxForm } from 'redux-form'
import breadcrumbs from 'shared/breadcrumb/reducer'
import language from './language'
export default {
  auth,
  language,
  await: awaitReducer,
  form: reduxForm,
  breadcrumbs
}
