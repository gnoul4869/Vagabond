import React, { useState } from 'react';
import VagabotIcon from '../images/vagabot.png';

const Chatbot = () => {
    const [isActivated, setIsActivated] = useState(false);

    return (
        <>
            <div className={`chatbot-bubble ${isActivated && 'active'}`}>
                <div className="chatbot-icon-container">
                    <img src={VagabotIcon} alt="vagabot_icon" className="chatbot-icon" />
                </div>
            </div>
        </>
    );
};

export default Chatbot;
