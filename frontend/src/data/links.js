import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';

export const socialLinks = [
    {
        id: 0,
        name: 'Facebook',
        url: 'https://www.facebook.com/',
        icon: <FaFacebook />,
    },
    {
        id: 1,
        name: 'Twitter',
        url: 'https://twitter.com/',
        icon: <AiFillTwitterCircle />,
    },
    {
        id: 2,
        name: 'Instagram',
        url: 'https://www.instagram.com/',
        icon: <RiInstagramFill />,
    },
];

export const profilePicture = './images/profile_picture.png';
