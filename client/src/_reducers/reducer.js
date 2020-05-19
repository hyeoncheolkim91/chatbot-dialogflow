import { SAVE_MESSAGE } from "../_actions/_type";




const initState = {
  message: []
}
export default function Reducer(state = initState, action) {

  switch (action.type) {
    case SAVE_MESSAGE:
      return {
        ...state,
        message: state.message.concat(action.payload)
      }
    default:
      return state;

  }

}
