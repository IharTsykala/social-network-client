import { call, put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import ServiceFriends from "../../../services/service-friend"
import { LoadingState } from "../../../shared/constants/user-from-view-mode.enum"
import { setLoadingState } from "../loading/loading.actions"

import {
  ActionTypes,
  setUserLoginInStore,
  setUserOwnerThisPageInStore,
  setAllUsersInStore,
  setInitialStateForUserReducer,
  getFailureAction,
} from "./user.actions"

function* setUserLoginInStoreSaga() {
  try {
    yield put(setLoadingState(LoadingState.loading))
    const userLog = yield Service.getUserByToken()
    if (userLog._id) {
      yield put(setUserLoginInStore(userLog))
      yield put(setLoadingState(LoadingState.loaded))
    } else {
      yield put(setLoadingState(LoadingState.notFound))
    }
  } catch (e) {
    yield put(setLoadingState(LoadingState.error))
    yield put(getFailureAction(e))
  }
}

function* setUserOwnerThisPageInStoreSaga(actions: any) {
  try {
    yield put(setLoadingState(LoadingState.loading))
    const userOwnerThisPage = yield call(Service.getUserByID, actions.payload)
    if (userOwnerThisPage._id) {
      yield put(setUserOwnerThisPageInStore(userOwnerThisPage))
      yield put(setLoadingState(LoadingState.loaded))
    } else {
      yield put(setLoadingState(LoadingState.notFound))
    }
  } catch (e) {
    yield put(setLoadingState(LoadingState.error))
    yield put(getFailureAction(e))
  }
}

function* setAllUsersSaga(actions: any) {
  try {
    yield put(setLoadingState(LoadingState.loading))
    let list
    if (actions.payload === "") list = []
    else list = yield Service.getUserWithSubscriptionsById(actions.payload)
    if (list.length) {
      yield put(setAllUsersInStore(list))
      yield put(setLoadingState(LoadingState.loaded))
    } else {
      yield put(setLoadingState(LoadingState.notFound))
    }
  } catch (e) {
    yield put(setLoadingState(LoadingState.error))
    yield put(getFailureAction(e))
  }
}

function* setAllUsersAfterPaginationSaga(actions: any) {
  try {
    yield put(setLoadingState(LoadingState.loading))
    let list
    if (actions.payload === "") list = []
    else
      list = yield Service.getUserAfterPaginationAndSearchAndFilter(
        actions.payload
      )
    if (list.length) {
      yield put(setAllUsersInStore(list))
      yield put(setLoadingState(LoadingState.loaded))
    } else {
      yield put(setLoadingState(LoadingState.notFound))
    }
  } catch (e) {
    yield put(setLoadingState(LoadingState.error))
    yield put(getFailureAction(e))
  }
}

function* getAllFriendsByUserIdSaga(actions: any) {
  try {
    yield put(setLoadingState(LoadingState.loading))
    let list
    if (actions.payload === "") list = []
    else list = yield ServiceFriends.getArrayFriendsByIdUser(actions.payload)
    if (list.length) {
      yield put(setAllUsersInStore(list))
      yield put(setLoadingState(LoadingState.loaded))
    } else {
      yield put(setLoadingState(LoadingState.notFound))
    }
  } catch (e) {
    yield put(setLoadingState(LoadingState.error))
    yield put(getFailureAction(e))
  }
}

function* setUserLogoutInStoreSaga(actions: any) {
  try {
    yield Service.logOutAllDevices(actions.userId, actions.user)
    yield put(setInitialStateForUserReducer())
    yield localStorage.removeItem("token")
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* userLoginSaga() {
  yield takeEvery(ActionTypes.GET_USER_LOGIN, setUserLoginInStoreSaga)
  yield takeEvery(
    ActionTypes.GET_USER_OWNER_THIS_PAGE,
    setUserOwnerThisPageInStoreSaga
  )
  yield takeEvery(
    ActionTypes.LOG_OUT_USER_FOR_ALL_DEVICES,
    setUserLogoutInStoreSaga
  )
  yield takeEvery(ActionTypes.GET_ALL_USERS, setAllUsersSaga)
  yield takeEvery(
    ActionTypes.GET_ALL_USERS_AFTER_PAGINATION,
    setAllUsersAfterPaginationSaga
  )
  yield takeEvery(
    ActionTypes.GET_ALL_FRIENDS_BY_USER_ID,
    getAllFriendsByUserIdSaga
  )
  // yield takeEvery(
  //   ActionTypes.GET_ALL_SUBSCRIPTIONS_BY_USER_ID,
  //   setAllSubscriptionsByUserIdSaga
  // )
  // yield takeEvery(
  //   ActionTypes.GET_ALL_SUBSCRIBERS_BY_USER_ID,
  //   setAllSubscribersByUserIdSaga
  // )
}