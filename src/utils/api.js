const baseUrl = 'https://norma.nomoreparties.space/api';

const getResponse = (result) => {
    if (result.ok) {
        return result.json();
    }

    return Promise.reject(`Error: ${result.status}`);
};

export const fetchIngridients = async () => {
    return fetch(`${baseUrl}/ingredients`).then(getResponse);
};

export const fetchOrder = async (ingridients) => {
    return fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ingridients),
    }).then(getResponse);
};
