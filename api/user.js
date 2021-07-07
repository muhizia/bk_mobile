import {Alert} from 'react-native';

export const loginAPI = (api, username, password, result) => {
    fetch(api + "/login",
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
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