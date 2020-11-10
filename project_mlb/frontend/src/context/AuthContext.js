import React from 'react';

export default React.createContext({
    token: null,
    firstName: null,
    preferredGenres: null,
    userEmail: null,
    userID: null,
    user_id: null,
    tokenExpiration: null,
    login: (token, firstName, preferredGenres, userEmail, user_id, userID, tokenExpiration) =>{},
    logout: () => {}
})