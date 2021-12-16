import React from 'react';

//A context is a special React object which will allow us to store information within and pass it around our components within the app.
//The context object is a different approach to passing information between components without the need to pass props from component to component
const UserContext = React.createContext();


//The "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object
export const UserProvider = UserContext.Provider;


export default UserContext;
