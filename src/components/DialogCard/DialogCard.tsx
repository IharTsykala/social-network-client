import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import DialogCardCSS from "./DialogCard.module.css"
import { currentDialogAction } from "../../Redux/store/currentDialog/currentDialog.actions"

type DialogCardProps = {
  user: User
  dispatch: any
  thisDialog?: any
  thisUser?: any
}

const DialogCard: React.FunctionComponent<DialogCardProps> = ({
  user,
  dispatch,
  thisDialog,
  thisUser
}) => {
  useEffect(() => {console.log(thisDialog)})

  const handlerClickOnDialog = () => {
    dispatch(currentDialogAction(thisDialog))
  }

  const handlerClickOnUser = () => {
    // dispatch(getIdCurrentDialog())
  }

  return (
    <>
      <li
        className={
          DialogCardCSS.dialogs_page__rules_dialogs__list_dialogs__card
        }
        onClick={
          (thisDialog && (() => handlerClickOnDialog())) ||
          (thisUser && (() => handlerClickOnUser()))
        }
      >
        {(thisDialog && `${thisDialog.members}`) ||
          (thisUser && `${thisUser.login}`)}
      </li>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(DialogCard)
