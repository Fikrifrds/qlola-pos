export const SHOW_ALERT = 'SHOW_ALERT';

const showAlert = (message, variant, state) => {
  return {...state, alert: { isShowed: true, message, variant}}
};

export const globalReducer = (state, action) => {
    switch (action.type) {
        case showAlert:
            return showAlert(action.message, action.variant, state);
        default:
            return state;

    }
};
