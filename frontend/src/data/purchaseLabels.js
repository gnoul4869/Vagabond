import { FiClock } from 'react-icons/fi';
import { ImTruck } from 'react-icons/im';
import { FaTruckLoading } from 'react-icons/fa';
import { MdOutlineCancelPresentation } from 'react-icons/md';

export const purchaseLabels = [
    {
        id: 0,
        name: 'Tất cả',
        code: '',
    },
    {
        id: 1,
        name: 'Chờ xác nhận',
        code: 'pending',
        text: 'Đang chờ nhân viên xác nhận',
        color: 'text-maroon',
        icon: <FiClock className="icon me-2" />,
    },
    {
        id: 2,
        name: 'Đang giao',
        code: 'shipping',
        text: 'Đơn hàng đang được giao',
        color: 'text-lightseagreen',
        icon: <ImTruck className="icon me-2" />,
    },
    {
        id: 3,
        name: 'Đã giao',
        code: 'delivered',
        text: 'Giao hàng thành công',
        color: 'text-coral',
        icon: <FaTruckLoading className="icon me-2" />,
    },
    {
        id: 4,
        name: 'Đã huỷ',
        code: 'cancelled',
        text: 'Đã huỷ đơn hàng',
        color: 'text-pinker',
        icon: <MdOutlineCancelPresentation className="icon me-2" />,
    },
];
