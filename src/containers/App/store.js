import create from 'zustand'
import {
  ifElse,
  always,
  compose,
  join,
  map
} from 'ramda'

import {
  neitherNullNorEmpty,
  notEmpty
} from 'utils/logicHelper'

import request from 'utils/request'

const useAppStore = create((set, get) => ({
  candidateList: [],
  selectedUser: {},
  
  applicationApiLoading: false,
  applicationApiSuccess: false,
  applicationApiError: false,
  hasApplication: false,
  getCandidate: async () => {
    const candidateApiResponse = await request.get('/candidates')

    set(() => ({
      candidateList: candidateApiResponse.data ?? []
    }))
  },
  getApplication: async ({ userId }) => {
    try {
      set(() => ({
        applicationApiLoading: false,
        applicationApiSuccess: false,
        applicationApiError: false,
        selectedUser: get().candidateList.find(({ id }) => id === userId)
      }))

      const applicationApiResponse = await request.get(`/applications?userId=${userId}`)
      const hasApplication = neitherNullNorEmpty(applicationApiResponse.data)

      if (hasApplication) {
        await get().getQuestion(userId)
      }

      set(() => ({
        hasApplication,
        applicationApiSuccess: true
      }))
    } catch (error) {
      set(() => ({ applicationApiError: error }))
    } finally {
      set(() => ({ applicationApiLoading: false }))
    }
  },

  questionApiLoading: false,
  questionApiSuccess: false,
  questionApiError: false,
  questionList: [],
  getQuestion: async (userId) => {
    try {
      set(() => ({
        questionApiLoading: false,
        questionApiSuccess: false,
        questionApiError: false
      }))

      const questionApiResponse = await request.get(`/questions?userId=${userId}`)
      const questionList = questionApiResponse.data ?? []

      const questionIdParameter = ifElse(
        notEmpty,
        compose(
          join('&'),
          map(({id}) => `questionId=${id}`)
        ),
        always('')
      )(questionList)

      const commentApiResponse = await request.get(`/comments?${questionIdParameter}`)
      console.log({ commentApiResponse })
      
      set(() => ({
        questionList: questionList.map((properties) => ({
          ...properties,
          comments: commentApiResponse.data.filter(({ questionId }) => questionId === properties.id)
        })),
        questionApiSuccess: true
      }))
    } catch (error) {
      set(() => ({ questionApiError: error }))
    } finally {
      set(() => ({ questionApiLoading: false }))
    }
  },

  submitCommentLoading: false,
  submitCommentSuccess: false,
  submitCommentError: false,
  submitComment: async ({ questionId, comment }) => {
    try {
      set(() => ({
        submitCommentLoading: false,
        submitCommentSuccess: false,
        submitCommentError: false
      }))

      await request.post(`/comments`, { questionId, comment })

      const userId = get().selectedUser.id
      await get().getQuestion(userId)

      set(() => ({
        submitCommentSuccess: true
      }))
    } catch (error) {
      set(() => ({ submitCommentError: error }))
    } finally {
      set(() => ({ submitCommentLoading: false }))
    }
  }
}))

export default useAppStore
