import moment from 'moment';
import {
    CHATBOT_GET_RESPONSE_FAIL,
    CHATBOT_GET_RESPONSE_REQUEST,
    CHATBOT_GET_RESPONSE_SUCCESS,
} from '../constants/chatbotConstants';

export const chatbot = (state = { messages: [], isLoading: false }, action) => {
    switch (action.type) {
        case CHATBOT_GET_RESPONSE_REQUEST:
            const newMessages = {
                message: action.payload,
                response: '',
                messageTimestamp: moment(),
                responseTimestamp: 'TBD',
            };
            return {
                ...state,
                messages: state.messages.concat(newMessages),
                isLoading: true,
            };
        case CHATBOT_GET_RESPONSE_SUCCESS:
            return {
                ...state,
                messages: state.messages.map((item) =>
                    item.response === ''
                        ? { ...item, response: action.payload, responseTimestamp: moment() }
                        : item
                ),
                isLoading: false,
            };
        case CHATBOT_GET_RESPONSE_FAIL:
            return {
                ...state,
                message: state.messages.map((item) =>
                    item.response === ''
                        ? { ...item, response: action.payload, responseTimestamp: moment() }
                        : item
                ),
                isLoading: false,
            };
        default:
            return state;
    }
};
