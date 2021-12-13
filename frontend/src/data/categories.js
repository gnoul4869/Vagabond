import MusicIcon from '../images/categories/vagabond_category_music.png';
import MobileIcon from '../images/categories/vagabond_category_mobile.png';
import ElectronicIcon from '../images/categories/vagabond_category_electronic.png';
import ComputerIcon from '../images/categories/vagabond_category_computer.png';
import FashionIcon from '../images/categories/vagabond_category_fashion.png';
import AllIcon from '../images/categories/vagabond_category_all.png';

export const categories = [
    {
        id: 0,
        name: 'Âm nhạc',
        icon: MusicIcon,
        url: '/products?category=Âm nhạc',
    },
    {
        id: 1,
        name: 'Điện thoại',
        icon: MobileIcon,
        url: '/products?category=Điện thoại',
    },

    {
        id: 2,
        name: 'Điện tử',
        icon: ElectronicIcon,
        url: '/products?category=Điện tử',
    },
    {
        id: 3,
        name: 'Link kiện máy tính',
        icon: ComputerIcon,
        url: '/products?category=Link kiện máy tính',
    },
    {
        id: 4,
        name: 'Thời trang',
        icon: FashionIcon,
        url: '/products?category=Thời trang',
    },
    {
        id: 5,
        name: 'Tất cả',
        icon: AllIcon,
        url: '/products',
    },
];
