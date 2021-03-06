import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import { setUserLoginInStore } from "../user/user.actions"
import { ActionTypes, getFailureAction } from "./avatar.actions"

function* setAvatar(actions: any) {
  try {
    const imgName = yield Service.setImgUser(
      actions.payload.avatar,
      actions.payload.userOwnerThisPage._id
    )
    yield Service.editUser(actions.payload.userOwnerThisPage._id, {
      avatar: imgName,
      password: "",
    })
    if (
      actions.payload.userOwnerThisPage._id === actions.payload.userLogin._id &&
      actions.payload.avatarForFront
    ) {
      const newUser = Object.assign({}, actions.payload.userOwnerThisPage, {
        avatar: imgName,
      })
      yield put(setUserLoginInStore(newUser))
    }
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* avatarSaga() {
  yield takeEvery(ActionTypes.GET_AVATAR, setAvatar)
}
