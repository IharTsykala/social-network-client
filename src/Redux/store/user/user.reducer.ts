import { ActionTypes } from "./user.actions"
import { Action } from "../../actionsInterface/action.interface"
import { User } from "../../entitiesInterface/user.interface"
export interface State {
  user: User
  userOwnerThisPage: User
  allUsers: [User]
}

const initialState: State = {
  user: {} as User,
  userOwnerThisPage: {} as User,
  allUsers: [{} as User],
}

export const userReducer = (state: State = initialState, action: Action<{}>) => {
  switch (action.type) {
  case ActionTypes.SET_USER_LOGIN_IN_STORE:
    return {
      ...state,
      user: action.payload
    }
  case ActionTypes.SET_USER_OWNER_THIS_PAGE_IN_STORE:
    return {
      ...state,
      userOwnerThisPage: action.payload
    }
  case ActionTypes.SET_ALL_USERS_IN_STORE:
    return {
      ...state,
      allUsers: action.payload
    }
  case ActionTypes.SET_INITIAL_STATE_FOR_USER_REDUCER:
    return initialState
  default:
    return state
  }
}
