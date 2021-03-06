import { Action } from "../../actionsInterface/action.interface"
import { User } from "../../entitiesInterface/user.interface"

export const ActionTypes = {
  GET_USER_LOGIN: "[user] get user login",
  GET_USER_SIGN_UP: "[user] get user signUp",
  GET_USER_REFRESH: "[user] get user refresh",
  SET_USER_LOGIN_IN_STORE: "[user] set user login in store",
  REMOVE_USER_FROM_STORE: "[user] remove user from store",

  GET_USER_OWNER_THIS_PAGE: "[user] get user owner this page",
  SET_USER_OWNER_THIS_PAGE_IN_STORE: "[user] set user owner this page in store",
  // maybe need REMOVE_USER_OWNER_THIS_PAGE_FROM_STORE

  GET_ALL_USERS: "[user] get all user", // maybe don't need
  // maybe need only GET_ALL_USERS_AFTER_PAGINATION
  GET_ALL_USERS_AFTER_PAGINATION: "[user] get all users after pagination",
  GET_ALL_FRIENDS_BY_USER_ID: "[User] get all friends by userId",
  GET_ALL_SUBSCRIPTIONS_BY_USER_ID: "[User] get all subscriptions by userId",
  GET_ALL_SUBSCRIBERS_BY_USER_ID: "[User] get all subscribers by userId",
  SET_ALL_USERS_IN_STORE: "[user] get all user in store",
  REMOVE_ALL_USERS_FROM_STORE: "[user] remove all user in store from store",

  LOG_OUT_USER_FOR_ALL_DEVICES: "[user] log out user for all devices",
  SET_INITIAL_STATE_FOR_USER_REDUCER:
    "[user] set initial state for userReducer",

  GET_FAILURE: "[getFailureAction] get failure action",
}

//User login or signUp

export const getUserLogin = (userId: string, user: {}): Action<{}> => ({
  type: ActionTypes.GET_USER_LOGIN,
  payload: { userId, user },
})

export const getUserSignUp = (userId: string, user: {}): Action<{}> => ({
  type: ActionTypes.GET_USER_SIGN_UP,
  payload: { userId, user },
})

export const getUserRefresh = (): Action<{}> => ({
  type: ActionTypes.GET_USER_REFRESH,
})

export const setUserLoginInStore = (user: User): Action<User> => ({
  type: ActionTypes.SET_USER_LOGIN_IN_STORE,
  payload: user,
})

// UserOwnerThisPage

export const getUserOwnerThisPage = (userId: string): Action<string> => ({
  type: ActionTypes.GET_USER_OWNER_THIS_PAGE,
  payload: userId,
})

export const setUserOwnerThisPageInStore = (user: User): Action<User> => ({
  type: ActionTypes.SET_USER_OWNER_THIS_PAGE_IN_STORE,
  payload: user,
})

// All users

export const getAllUsers = (userId: string): Action<string> => ({
  type: ActionTypes.GET_ALL_USERS,
  payload: userId,
})

export const getAllUsersAfterPagination = (parametersPagination: {}): Action<{}> => ({
  type: ActionTypes.GET_ALL_USERS_AFTER_PAGINATION,
  payload: parametersPagination,
})

export const getAllFriendsByUserId = (userId: string): Action<string> => ({
  type: ActionTypes.GET_ALL_FRIENDS_BY_USER_ID,
  payload: userId,
})

export const getAllSubscriptionsByUserId = (
  userId: string
): Action<string> => ({
  type: ActionTypes.GET_ALL_SUBSCRIPTIONS_BY_USER_ID,
  payload: userId,
})

export const getAllSubscribersByUserId = (userId: string): Action<string> => ({
  type: ActionTypes.GET_ALL_SUBSCRIBERS_BY_USER_ID,
  payload: userId,
})

export const setAllUsersInStore = (arrayUsers: [User]): Action<[User]> => ({
  type: ActionTypes.SET_ALL_USERS_IN_STORE,
  payload: arrayUsers,
})

export const logOutUserForAllDevices = (
  userId: string,
  user: User
): Action<any> => ({
  type: ActionTypes.LOG_OUT_USER_FOR_ALL_DEVICES,
  payload: { userId, user },
})

export const setInitialStateForUserReducer = (): Action<{}> => ({
  type: ActionTypes.SET_INITIAL_STATE_FOR_USER_REDUCER,
})

//Failures

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error,
})
