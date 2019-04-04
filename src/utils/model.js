import api from "@/services"
import isFunction from 'lodash/isFunction'

export const model = (queryApi, params) => ({
  state: {
    query: {},
    data: null,
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryData' })
    },
  },
  effects: {
    *queryData({}, { call, put }) {
      if (queryApi) {
        const { response } = yield call(queryApi, params)
        if (response) {
          yield put({ type: 'updateState', payload: { data: response } })
        }
      }
    },
    *fetchApi({ payload, callback }, { call, put }) {
      if (api[payload.key]) {
        const { response } = yield call(api[payload.key], payload.params)
        if (response) {
          yield put({
            type: 'updateState',
            payload: {
              [payload.key]: response,
            },
          })
          if (isFunction(callback)) {
            callback(response)
          }
        }
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export const modelPage = {
  effects: {
    *fetchApiPage({ payload, callback }, { call, put }) {
      const { response } = yield call(api[payload.key], payload.params)
      if (response) {
        yield put({
          type: 'updateStatePage',
          payload: {
            [payload.key]: response.rows,
            [`${payload.key}Page`]: {
              current: response.page,
              pageSize: response.pageSize,
              total: response.count,
            },
          },
        })
        if (isFunction(callback)) {
          callback(response)
        }
      }
    },
  },
  reducers: {
    updateStatePage(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
