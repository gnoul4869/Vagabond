import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import VagabotIcon from '../images/vagabot.png';

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

            <div className={`chat-container ${isActivated && 'active'}`}>
                <div className="chat-header">
                    <div className="fsr-4 text-ired fw-600">Vagabot</div>
                    <div className="chat-exit-btn" onClick={() => setIsActivated(false)}>
                        <VscChromeClose />
                    </div>
                </div>
                <div className="chat-message-container"></div>
            </div>
        </>
    );
};

export default Chatbot;
