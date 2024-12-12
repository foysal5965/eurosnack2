

export const getCart = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No access token found');
    }

    const res = await fetch(
        `http://localhost:5000/api/v1/cart`,
        {
            method: 'GET',
            headers: {
                'Authorization': `${token}`, // Add token here
                'Content-Type': 'application/json', // Optional, but commonly used
            },
        }
    );

    

    const cartInfo = await res.json();

    return cartInfo;
};
