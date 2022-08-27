import {
  GET_INCREMENT,
  GET_DECREMENT,
  GET_INCREMENT_CHAT_ID,
  SET_CHAT_ID_FIRST,
  ADD_CHAT_LIST,
  ADD_MESSAGE,
  REMOVE_CHAT,
  CLEAR_MESSAGE_LIST,
  GET_CLEAR,
  GET_CATS,
  GET_CATS_LOADING,
  GET_CATS_ERROR,
  GET_CATS_CLEAR_ERROR,
} from "../actionTypes";

const initialState = {
  count: 0,
  messageList: [],
  listChat: [],
  galleryCats: [],
  currentChatID: 1,
  loading: false,
  error: null,
};

export const cacheReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case GET_DECREMENT:
      return { ...state, count: state.count - 1 };
    case GET_CLEAR:
      return { ...state, count: 0 };
    case GET_INCREMENT_CHAT_ID:
      return {
        ...state,
        currentChatID: state.currentChatID + 1,
      };
    case SET_CHAT_ID_FIRST:
      return {
        ...state,
        currentChatID: 1,
      };
    case ADD_CHAT_LIST:
      return { ...state, listChat: [...state.listChat, action.payload] };
    case ADD_MESSAGE:
      return { ...state, messageList: [...state.messageList, action.payload] };
    case REMOVE_CHAT:
      return { ...state, listChat: action.payload };
    case CLEAR_MESSAGE_LIST:
      return { ...state, messageList: [] };
    case GET_CATS:
      return {
        ...state,
        galleryCats: action.payload,
        loading: false,
      };
    case GET_CATS_LOADING:
      return { ...state, loading: true };
    case GET_CATS_ERROR:
      return { ...state, error: action.payload };
    case GET_CATS_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
