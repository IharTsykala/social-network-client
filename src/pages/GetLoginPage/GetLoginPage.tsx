import React, { useContext } from "react"
import Service from "../../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import { Context } from "../../Context"
import GetLoginPageCSS from "./GetLoginPage.module.css"
import { connect } from 'react-redux'
// import {userLogIn} from "../../Redux/store/todos/todos.actions";

export const GetLoginPage: React.FC = () => {
  const history = useHistory()
  const {
    userLogin,
    setUserLogin,
    setUserID,
    setUserAvatar,
    setUserRole
  } = useContext(Context)

  const logInHandler = async (id: any, user: any) => {
    try {
      const data = await Service.getTokenForLogin(id, user)
      // dispatch(userLogIn(data.user))
      localStorage.setItem("token", data.token)
      setUserLogin(data.user.login)
      setUserID(data.user._id)
      setUserAvatar(data.user.avatar)
      setUserRole(data.user.role)
      if(data.user.role==='admin') history.push(`/admin/all`)
      else history.push(`/user/all`)
    } catch (e) {
      console.log(e)
    }
  }

  

  return (
    <>
      <h3 className={GetLoginPageCSS.main__log_in__header}>Welcome Back</h3>
      {!userLogin && (
        <>
          <FormDataUsers
            submitHandler={logInHandler}
            namePage={UserFormViewModes.LogIn}
            nameButton={UserFormViewButtons.LogIn}
          />
        </>
      )}
    </>
  )
}
