import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import AvatarBlockCSS from "./AvatarBlock.module.css"

type UserAvatarProps = {
  user: User,
  userOwnerThisPage: User,
  homePageStatus: boolean,
  avatarForFront: any,
  handleChangeAvatar: any,
  handleSubmit: any,
}

const AvatarBlock: React.FC<UserAvatarProps> = ({
  user,
  userOwnerThisPage,
  homePageStatus,
  avatarForFront,
  handleChangeAvatar,
  handleSubmit,
}) => {
  useEffect(() => {}, [userOwnerThisPage])
  return (
    <form
      action="submit"
      className={AvatarBlockCSS.profile__change_avatar__form}
    >
      {avatarForFront && (
        <img className="chelik" src={`${avatarForFront}`} alt="avatar" />
      )}
      {!avatarForFront && userOwnerThisPage._id && userOwnerThisPage.avatar && (
        <img
          className="chelik"
          src={`http://localhost:8080/images/users/${userOwnerThisPage._id}/${userOwnerThisPage.avatar}`}
          alt="avatar"
        />
      )}
      {!avatarForFront &&
        userOwnerThisPage._id &&
        !userOwnerThisPage.avatar && (
          <img
            className="chelik"
            src={`http://localhost:8080/images/pattern-avatar.jpg`}
            alt="avatar"
          />
        )}
      {/* {(user.role === "admin" || homePageStatus) && ( */}
      <>
        <Button
          variant="outlined"
          component="button"
          disabled={!homePageStatus && true}
        >
          Choose avatar
          <input type="file" onChange={(e) => handleChangeAvatar(e)} />
        </Button>
        <Button
          variant="outlined"
          component="button"
          onClick={(e: any) => handleSubmit(e)}
          disabled={!homePageStatus && true}
        >
          Change Avatar
        </Button>
      </>
      {/* )} */}
    </form>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  userOwnerThisPage: state.user.userOwnerThisPage,
})

export default connect(mapStateToProps)(AvatarBlock)
