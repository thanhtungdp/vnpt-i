import React from 'react'
import { Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import slug from 'constants/slug'
import OverviewDashboard from 'containers/dashboard/OverviewDashboard'
import PageSidebarLayout from 'layout/default-sidebar-layout'
import QuizListsList from 'containers/general/quiz-lists/quiz-lists-list'
import UserList from 'containers/general/users/user-list'
import GallerySliderList from 'containers/general/gallery-slider/gallery-slider-list'
import GallerySliderCreate from 'containers/general/gallery-slider/gallery-slider-create'
import GallerySliderEdit from 'containers/general/gallery-slider/gallery-slider-edit'

@autobind
export default class ManagerRoute extends React.Component {
  render() {
    return (
      <PageSidebarLayout>
        <Route exact path="/" component={OverviewDashboard} />
        <Route exact path={slug.quizLists.base} component={QuizListsList} />
        <Route exact path={slug.users.base} component={UserList} />
        <Route
          exact
          path={slug.gallerySlider.base}
          component={GallerySliderList}
        />
        <Route
          exact
          path={slug.gallerySlider.create}
          component={GallerySliderCreate}
        />
        <Route
          exact
          path={slug.gallerySlider.edit}
          component={GallerySliderEdit}
        />
      </PageSidebarLayout>
    )
  }
}
