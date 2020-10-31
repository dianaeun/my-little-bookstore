import React from 'react';

export default React.createContext({
    token: null,
    userEmail: null,
    userId: null,
    tokenExpiration: null,
    login: (token, userEmail, userId, tokenExpiration) =>{},
    logout: () => {}
})