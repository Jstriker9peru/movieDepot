import { MODAL_OPEN, MODAL_CLOSE } from '../actions/modalConstants';
import { createReducer } from '../utils/reducerUtil';

const initialState = { modalType: "NoModal" };

const openModal = (state, payload) => {
    const {modalType, modalProps} = payload;
    return {modalType, modalProps}
}

const closeModal = (state, payload) => {
    return { modalType: "NoModal" };
}

export default createReducer(initialState, {
    [MODAL_OPEN]: openModal,
    [MODAL_CLOSE]: closeModal
})