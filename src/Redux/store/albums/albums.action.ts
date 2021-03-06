import { Action } from "../../actionsInterface/action.interface"
import { Album } from "../../entitiesInterface/album.interface"
import { Photo } from "../../entitiesInterface/photo.interface"

export const ActionTypes = {
  GET_LIST_ALBUMS_WITH_PHOTOS: "[Album] Get list albums with photos by userId",
  SET_LIST_ALBUMS_WITH_PHOTOS: "[Album] Set list albums with photos in store",
  REMOVE_ALBUM: "[Album] remove album",
  ADD_ALBUM: "[Album] add album by userId",
  GET_LIST_PHOTOS_BY_ALBUM_ID: "[Album] Get list photos by albumId",
  SET_LIST_PHOTOS_FOR_CURRENT_ALBUM:
    "[Album] Set list photos for current album",
  ADD_PHOTOS_IN_CURRENT_ALBUM: "[Album] add photos in current album",
  REMOVE_PHOTO_FROM_CURRENT_ALBUM: "[Album] remove photo from current album",
  GET_LIST_PHOTOS_BY_USER_ID: "[Photo] get list photos by UserId",
  SET_LIST_PHOTOS_FOR_USER: "[Photo] set list photos For User",
  GET_FAILURE: "[getFailure] Get failure",
}

export const getListAlbumsWithPhotosByUserIDAction = (
  userId: string
): Action<string> => ({
  type: ActionTypes.GET_LIST_ALBUMS_WITH_PHOTOS,
  payload: userId,
})

export const setListAlbumsWithPhotosInStoreAction = (
  albums: [Album]
): Action<[Album]> => ({
  type: ActionTypes.SET_LIST_ALBUMS_WITH_PHOTOS,
  payload: albums,
})

export const removeAlbumAction = (
  albumId: string,
  userId: string
): Action<{}> => ({
  type: ActionTypes.REMOVE_ALBUM,
  payload: { albumId, userId },
})

export const addAlbumWithPhotosByUserIdAction = (
  userId: string,
  arrayPhotos: []
): Action<{}> => ({
  type: ActionTypes.ADD_ALBUM,
  payload: { userId, arrayPhotos },
})

export const getListPhotosByAlbumIdAction = (
  albumId: string
): Action<string> => ({
  type: ActionTypes.GET_LIST_PHOTOS_BY_ALBUM_ID,
  payload: albumId,
})

export const setListPhotosForCurrentAlbumAction = (
  albums: [Photo]
): Action<[Photo]> => ({
  type: ActionTypes.SET_LIST_PHOTOS_FOR_CURRENT_ALBUM,
  payload: albums,
})

export const addPhotosInCurrentAlbumAction = (
  userOwnerThisPageId: string,
  albumId: string,
  arrayPhotos: []
): Action<{}> => ({
  type: ActionTypes.ADD_PHOTOS_IN_CURRENT_ALBUM,
  payload: { userOwnerThisPageId, albumId, arrayPhotos },
})

export const removePhotoFromCurrentAlbumAction = (
  photoId: string,
  albumId: string
): Action<{}> => ({
  type: ActionTypes.REMOVE_PHOTO_FROM_CURRENT_ALBUM,
  payload: { photoId, albumId },
})

export const getListPhotosByUserIdIdAction = (
  userId: string
): Action<string> => ({
  type: ActionTypes.GET_LIST_PHOTOS_BY_USER_ID,
  payload: userId,
})

export const setListPhotosForUserAction = (
  photos: [Photo]
): Action<[Photo]> => ({
  type: ActionTypes.SET_LIST_PHOTOS_FOR_USER,
  payload: photos,
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error,
})
