export const paginationButtons = [
    {
        id: 0,
        name: 'Liên quan',
        sort: 'relevance',
        type: 'button',
    },
    {
        id: 1,
        name: 'Mới nhất',
        sort: 'newest',
        type: 'button',
    },
    {
        id: 2,
        name: 'Bán chạy',
        sort: 'sales',
        type: 'button',
    },
];

export const paginationSelections = [
    {
        id: 0,
        name: 'Giá',
        type: 'default',
    },
    {
        id: 1,
        name: 'Giá thấp đến cao',
        sort: 'price',
        order: 'asc',
        type: 'select',
    },
    {
        id: 2,
        name: 'Giá cao đến thấp',
        sort: 'price',
        order: 'desc',
        type: 'select',
    },
];

export const paginationCategories = [
    {
        id: 0,
        name: 'Tất cả',
        type: 'default',
    },
];
