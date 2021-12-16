import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatbotResponse } from '../redux/actions/chatbotActions';
import { VscChromeClose } from 'react-icons/vsc';
import { IoSend } from 'react-icons/io5';
import PulseLoader from 'react-spinners/PulseLoader';
import moment from 'moment';
import VagabotIcon from '../images/vagabot.png';
import VagabotAvatar from '../images/vagabot_avatar.png';

const Chatbot = () => {
    const dispatch = useDispatch();
    const { messages, isLoading } = useSelector((state) => state.chatbot);
    const { userInfo } = useSelector((state) => state.auth);

    const messageRef = useRef(null);

    const [isActivated, setIsActivated] = useState(false);
    const [message, setMessage] = useState('');

    const messageHandler = () => {
        if (message) {
            dispatch(getChatbotResponse(message));
            setMessage('');
        }
    };

    useEffect(() => {
        messageRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

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

                            <div className="chat-timestamp">{moment().format('HH:mm')}</div>
                        </div>

                        <div className="chat-message">
                            Cảm ơn quý khách đã đến với website Vagabond
                        </div>
                    </div>

                    {messages.map((qA, qAIndex) => {
                        return (
                            <Fragment key={qAIndex}>
                                {[...Array(2)].map((item, index) => {
                                    const uniqueKey = `${index}.${qA['messageTimestamp']}.${qA['responseTimestamp']}`;
                                    return (
                                        <div
                                            className={`chat ${index === 0 ? 'right' : 'left'}`}
                                            key={uniqueKey}
                                        >
                                            <div className="chat-avatar-container">
                                                <div
                                                    className="chat-avatar"
                                                    style={{
                                                        backgroundImage: `url(${
                                                            index === 0
                                                                ? userInfo
                                                                    ? userInfo.image
                                                                    : '/images/user_profile_picture.jpg'
                                                                : VagabotAvatar
                                                        })`,
                                                    }}
                                                ></div>

                                                {((index === 1 &&
                                                    qA['responseTimestamp'] !== 'TBD') ||
                                                    index === 0) && (
                                                    <div className="chat-timestamp">
                                                        {moment(
                                                            qA[
                                                                `${
                                                                    index === 0
                                                                        ? 'messageTimestamp'
                                                                        : 'responseTimestamp'
                                                                }`
                                                            ]
                                                        ).format('HH:mm')}
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                className="chat-message"
                                                ref={index === 1 ? messageRef : null}
                                            >
                                                {isLoading &&
                                                index === 1 &&
                                                qA['response'] === '' ? (
                                                    <PulseLoader
                                                        color="lightseagreen"
                                                        css="display: inherit; margin: 0 auto;"
                                                        size={10}
                                                        margin={1}
                                                        speedMultiplier={0.7}
                                                    />
                                                ) : (
                                                    qA[`${index === 0 ? 'message' : 'response'}`]
                                                )}
                                            </div>
                                        </div>
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
                        <IoSend className="icon-2" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
