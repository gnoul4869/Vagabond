export const paginationButtons = [
    {
        id: 0,
        name: 'Liên quan',
        sort: 'relevance',
    },
    {
        id: 1,
        name: 'Mới nhất',
        sort: 'newest',
    },
    {
        id: 2,
        name: 'Bán chạy',
        sort: 'sales',
    },
];

export const paginationSelections = {
    title: 'Giá',
    options: [
        {
            id: 1,
            name: 'Giá thấp đến cao',
            sort: 'price-asc',
        },
        {
            id: 2,
            name: 'Giá cao đến thấp',
            sort: 'price-desc',
        },
    ],
};

export const paginationCategories = {
    title: 'Tất cả',
    options: [],
};
