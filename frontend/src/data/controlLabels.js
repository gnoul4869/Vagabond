import { FaClipboardList } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { FiPackage } from 'react-icons/fi';

export const controlLabels = [
    {
        id: 0,
        name: 'Trang chính',
        icon: <ImHome className="icon text-dodgerblue" />,
    },
    {
        id: 1,
        name: 'Đơn hàng',
        icon: <FaClipboardList className="icon text-coral" />,
    },
    {
        id: 2,
        name: 'Khác',
        icon: <FiPackage className="icon text-ired" />,
    },
];
