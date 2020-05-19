import { SAVE_MESSAGE } from "./_type";

export default function saveMessage(message) {
  return {
    type: SAVE_MESSAGE,
    payload: message,
  };
}
