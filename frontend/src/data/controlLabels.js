import { FaClipboardList } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { FiPackage } from 'react-icons/fi';

export const controlLabels = [
    {
        id: 0,
        name: 'Trang chính',
        icon: <ImHome className="icon fsr-3 text-dodgerblue me-2" />,
    },
    {
        id: 1,
        name: 'Đơn hàng',
        icon: <FaClipboardList className="icon fsr-3 text-coral me-2" />,
    },
    {
        id: 2,
        name: 'Khác',
        icon: <FiPackage className="icon fsr-3 text-ired me-2" />,
    },
];
