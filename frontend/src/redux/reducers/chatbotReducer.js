import {
    CHATBOT_GET_RESPONSE_FAIL,
    CHATBOT_GET_RESPONSE_REQUEST,
    CHATBOT_GET_RESPONSE_SUCCESS,
} from '../constants/chatbotConstants';

export const chatbot = (state = { messages: [], isLoading: false, error: '' }, action) => {
    switch (action.type) {
        case CHATBOT_GET_RESPONSE_REQUEST:
            const newMessages = { message: action.payload, response: '' };
            return {
                ...state,
                error: '',
                messages: state.messages.concat(newMessages),
                isLoading: true,
            };
        case CHATBOT_GET_RESPONSE_SUCCESS:
            return {
                ...state,
                messages: state.messages.map(
                    (item) => (item.response = '' ? { ...item, response: action.payload } : item)
                ),
                isLoading: false,
            };
        case CHATBOT_GET_RESPONSE_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
