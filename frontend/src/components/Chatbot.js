import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { IoSendSharp } from 'react-icons/io5';
import VagabotIcon from '../images/vagabot.png';
import VagabotAvatar from '../images/vagabot_avatar.png';

const Chatbot = () => {
    const [isActivated, setIsActivated] = useState(false);

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
                    <div className="chat right">
                        <div className="chat-avatar-container">
                            <div
                                className="chat-avatar"
                                style={{ backgroundImage: `url(${VagabotAvatar})` }}
                            ></div>
                        </div>
                        <div className="chat-message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum optio est
                        </div>
                    </div>
                </div>

                <div className="chat-form">
                    <textarea name="message"></textarea>
                    <button type="submit">
                        <IoSendSharp className="icon-2" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
