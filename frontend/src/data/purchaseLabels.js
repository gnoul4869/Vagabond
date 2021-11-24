import { FiClock } from 'react-icons/fi';

export const purchaseLabels = [
    {
        id: 0,
        name: 'Tất cả',
        code: 'all',
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
    },
    {
        id: 3,
        name: 'Đã giao',
        code: 'delivered',
        text: 'Giao hàng thành công',
    },
    {
        id: 4,
        name: 'Đã huỷ',
        code: 'cancelled',
        text: 'Đã huỷ đơn hàng',
    },
];
