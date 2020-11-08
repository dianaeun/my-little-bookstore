import React from 'react';

export default React.createContext({
    token: null,
    userEmail: null,
    userID: null,
    user_id: null,
    tokenExpiration: null,
    login: (token, userEmail, user_id, userID, tokenExpiration) =>{},
    logout: () => {}
})