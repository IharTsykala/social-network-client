import React, { useEffect, useCallback } from "react"
import { NavLink } from "react-router-dom"
import NavbarCSS from "./Navbar.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { getUserLoginForSagaAction } from "../../Redux/store/userLogin/userLogin.actions"
import { getUserLogoutForSagaAction } from "../../Redux/store/userLogin/userLogin.actions"

type NavbarProps = {
  user: User
  dispatch: any
  loadingState: String
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  user,
  dispatch,
  loadingState
}) => {
  const getUserAfterLogInAndRefresh = useCallback(async () => {
    if (localStorage.getItem("token")) dispatch(getUserLoginForSagaAction())
  }, [dispatch])

  useEffect(() => {
    getUserAfterLogInAndRefresh()
  }, [getUserAfterLogInAndRefresh])

  const handlerLogOut = async () => {
    try {
      dispatch(getUserLogoutForSagaAction(user._id, user))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <nav className={`${NavbarCSS.navbar_container} navbar_container`}>
        {(loadingState === "loading" && <h1>Ожидайте ответа</h1>) ||
          (loadingState === "notFound" && <h1>not found</h1>) ||
          (loadingState === "loaded" && (
            <>
              {user.login && (
                <>
                  <a
                    href="/"
                    className={`${NavbarCSS.navbar__avatar__brand_logo} brand-logo`}
                  >
                    {`Hello, ${user.login}`}
                  </a>
                  {user.avatar && (
                    <img
                      className={NavbarCSS.navbar__avatar}
                      src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`}
                      alt="avatar"
                    />
                  )}
                  {!user.avatar && (
                    <img
                      className={NavbarCSS.navbar__avatar}
                      src={`http://localhost:8080/images/pattern-avatar.jpg`}
                      alt="avatar"
                    />
                  )}
                </>
              )}
              {!user.login && (
                <a href="/" id={"incognito"} className="brand-logo">
                  {`Hello, Incognito`}
                </a>
              )}
              <ul className="right hide-on-med-and-down">
                <li>
                  <NavLink to={`/user/profile/${user._id}`}>
                    UserProfile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/user/allUsers`}>All Users</NavLink>
                </li>
                <li>
                  <NavLink to={`/${user._id}/dialogs`}>My Dialogs</NavLink>
                </li>
                {user.login && (
                  <li onClick={() => handlerLogOut()}>
                    <NavLink to="/">Log Out</NavLink>
                  </li>
                )}
                {!user.login && (
                  <>
                    <li>
                      <NavLink to="/LogIn">Log In</NavLink>
                    </li>
                    <li>
                      <NavLink to="/SignUp">Sign Up</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </>
          )) ||
          (loadingState === "error" && <h1>ошибка</h1>)}
      </nav>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  loadingState: state.loadingState.loadingState
})

export default connect(mapStateToProps)(Navbar)
