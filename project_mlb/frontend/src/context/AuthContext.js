import React from 'react';

export default React.createContext({
    token: null,
    userEmail: null,
    userID: null,
    tokenExpiration: null,
    login: (token, userEmail, userID, tokenExpiration) =>{},
    logout: () => {}
})