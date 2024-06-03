const fetchActiveOrders = async () => {
    return [
        { id: 1, name: 'Ram', status: 'active', price: 100, lastModified: '2024-05-24 T23:07:00' },
        { id: 2, name: 'Ram', status: 'active', price: 210, lastModified: '2024-05-24 T23:30:00' },
    ];
};

const fetchCompletedOrders = async () => {
    return [
        { id: 3, name: 'Ram', status: 'completed', price: 150, lastModified: '2024-05-24 T22:00:00' },
        { id: 4, name: 'Ram', status: 'completed', price: 250, lastModified: '2024-05-24 T22:30:00' },
    ];
};

export { fetchActiveOrders, fetchCompletedOrders };
