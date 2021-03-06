import * as actionTypes from './types/app';

export function setCurrentPage(page) {
  return { type: actionTypes.SET_CURRENT_PAGE, page };
}

export function setLoading(loading) {
  return { type: actionTypes.SET_LOADING, loading };
}

export function setShowModal(showModal) {
  return { type: actionTypes.SET_SHOW_MODAL, showModal };
}
