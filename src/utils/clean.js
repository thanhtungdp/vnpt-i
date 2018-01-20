/* eslint-disable */
import playType from 'constants/playType'
import { AUTH_API } from 'config'

export function cleanUser(user) {
  if (typeof user !== 'object') return {}
  if (!user) return {}
  return {
    ...user,
    id: user._id,
    fullname: user.fullname,
    description: user.biography,
    birthday: user.birthday,
    totalFollower: user.followed_users ? user.followed_users.length : 0,
    avatar: user.avatar_url
      ? user.avatar_url
      : user.avatar ? `${AUTH_API}/uploads/avatars/${user.avatar}` : '',
    balance: user.balance ? user.balance : 0
  }
}

export function cleanUsers(users) {
  return users.map(user => cleanUser(user))
}

export function cleanQuizListCustomField(customField = {}) {
  return {
    ...customField,
    isNotRandomRange: customField.isNotRandomRange,
    groupsRange: customField.groupsRange,
    isRandom: customField.isRandom,
    isCustomTime: !!customField.custom_time,
    openTime: customField.start_at,
    endTime: customField.end_at,
    playType: customField.playType ? customField.playType : playType.NORMAL
  }
}

export function cleanQuizList(quizList) {
  if (typeof quizList === 'string') return {}
  if (typeof quizList === 'null') return {}
  if (typeof quizList === 'undefined') return {}
  if (!quizList) return {}
  return {
    _id: quizList._id,
    id: quizList._id,
    name: quizList.title,
    description: quizList.description,
    slug: quizList.slug,
    accessibility: quizList.accessibility,
    timeLength: quizList.time,
    pdfFile: quizList.pdf_file,
    customField: cleanQuizListCustomField(quizList.custom_field),
    imageLatex: '/quiz-list/' + quizList.slug + '/' + quizList.slug + '.png',
    totalAccess: quizList.access_count,
    totalQuestion: quizList.total_questions,
    totalRating: 4,
    user:
      typeof quizList.user_id === 'object' ? cleanUser(quizList.user_id) : {},
    categoryId:
      typeof quizList.category_id === 'object'
        ? quizList.category_id._id
        : quizList.category_id,
    tags: quizList.tags.map(tag => tag.tag_name),
    statusType: quizList.status_type,
    createdAt: quizList.created_at,
    updatedAt: quizList.updated_at
  }
}

export function cleanQuizLists(quizLists) {
  return quizLists.map(quizList => cleanQuizList(quizList))
}
