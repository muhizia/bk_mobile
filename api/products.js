import {Alert} from 'react-native';
import {createFormData} from '../utils/form'

export const getProducts = (api, result) => {
    fetch(api + "/product",
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(
            function(response) {
                console.log("Content-Type: " + response.headers.get('Content-Type'));
                // Examine the text in the response
                response.json().then(function(data) {
                    console.log(JSON.stringify(data));
                    result(false, data)
                });
            }
        )
        .catch((error) => {
            console.error(error);
        });
}

export const addProductAPI = (api, userID, categoryID, pName, price, currency, description, manufactDate, photo, result) => {
    fetch(api + "/product/",
        {
            method: 'POST',
            body: createFormData(photo, {
                userID: userID,
                categoryID: categoryID,
                pName: pName,
                price: price,
                currency: currency,
                description: description,
                manufactDate: manufactDate
            }),
        })
        .then(
            function(response) {
                console.log("Content-Type: " + response.headers.get('Content-Type'));
                // Examine the text in the response
                response.json().then(function(data) {
                    console.log(JSON.stringify(data));
                    result(false, data)
                });
            }
        )
        .catch((error) => {
            console.error(error);
        });
}