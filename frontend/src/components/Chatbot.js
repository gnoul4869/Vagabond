import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatbotResponse } from '../redux/actions/chatbotActions';
import { VscChromeClose } from 'react-icons/vsc';
import { IoSendSharp } from 'react-icons/io5';
import PulseLoader from 'react-spinners/PulseLoader';
import VagabotIcon from '../images/vagabot.png';
import VagabotAvatar from '../images/vagabot_avatar.png';

const Chatbot = () => {
    const dispatch = useDispatch();
    const { messages, isLoading } = useSelector((state) => state.chatbot);
    const { userInfo } = useSelector((state) => state.auth);

    const [isActivated, setIsActivated] = useState(false);
    const [message, setMessage] = useState('');

    const messageHandler = () => {
        if (message) {
            dispatch(getChatbotResponse(message));
            setMessage('');
        }
    };

    return (
        <>
            <div
                className={`chatbot-bubble ${isActivated && 'active'}`}
                onClick={() => setIsActivated(true)}
            >
                <div className="chatbot-icon-container">
                    <img src={VagabotIcon} alt="vagabot_icon" className="chatbot-icon" />
                </div>
            </div>

            <div className={`chatbox ${isActivated && 'active'}`}>
                <div className="chatbox-header">
                    <div className="fsr-4 text-ired fw-600">Vagabot</div>
                    <div className="chatbox-exit-btn" onClick={() => setIsActivated(false)}>
                        <VscChromeClose />
                    </div>
                </div>

                <div className="chatlogs">
                    <div className="chat left">
                        <div className="chat-avatar-container">
                            <div
                                className="chat-avatar"
                                style={{ backgroundImage: `url(${VagabotAvatar})` }}
                            ></div>
                        </div>
                        <div className="chat-message">
                            Cảm ơn quý khách đã đến với website Vagabond
                        </div>
                    </div>

                    {messages.map((qA, index) => {
                        const keys = Object.keys(qA);
                        return (
                            <Fragment key={index}>
                                {keys.map((item) => {
                                    const uniqueKey = `${qA[item]}.${qA['messageTimestamp']}.${qA['responseTimestamp']}`;
                                    return (
                                        <Fragment key={uniqueKey}>
                                            {item !== 'messageTimestamp' &&
                                                item !== 'responseTimestamp' && (
                                                    <div
                                                        className={`chat ${
                                                            item === 'message' ? 'right' : 'left'
                                                        }`}
                                                        key={uniqueKey}
                                                    >
                                                        <div className="chat-avatar-container">
                                                            <div
                                                                className="chat-avatar"
                                                                style={{
                                                                    backgroundImage: `url(${
                                                                        item === 'message'
                                                                            ? userInfo
                                                                                ? userInfo.image
                                                                                : '/images/user_profile_picture.jpg'
                                                                            : VagabotAvatar
                                                                    })`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div className="chat-message">
                                                            {isLoading &&
                                                            item === 'response' &&
                                                            qA[item] === '' ? (
                                                                <PulseLoader
                                                                    color="lightseagreen"
                                                                    css="display: inherit; margin: 0 auto;"
                                                                    size={10}
                                                                    margin={1}
                                                                    speedMultiplier={0.7}
                                                                />
                                                            ) : (
                                                                qA[item]
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </Fragment>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </div>

                <div className="chat-form">
                    <textarea
                        name="message"
                        placeholder="Nhập tin nhắn..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button type="button" onClick={messageHandler}>
                        <IoSendSharp className="icon-2" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
