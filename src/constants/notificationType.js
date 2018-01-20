export const type = {
  SYSTEM: 'system_notification',
  USER_ACTIVITY: 'user_activity_notification',
  WELCOME: 'welcome'
}

export const action = {
  USER_CREATE_NEW_QUIZ_LIST: 'user_create_new_quiz_list',
  USER_UPDATE_QUIZ_LIST: 'user_update_quiz_list',
  COMMENT_ON_QUIZ_LIST: 'comment_on_quiz_list',
  RELY_COMMENT: 'rely_comment',
  RATE_QUIZ_LIST: 'rate_quiz_list',
  COMPLETE_QUIZ_LIST: 'user_complete_quiz_list',
  USER_FOLLOW: 'user_follow_user',
  NEW_QUIZ_LIST_CREATED_IN_TAG: 'new_quiz_list_created_in_tag'
}

export const status = {
  NEW: 'notification_status_new',
  VIEWED: 'notification_status_viewed',
  CHECKED: 'notification_status_checked'
}

export default {
  type,
  action,
  status
}
