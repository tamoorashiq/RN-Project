import React, {useState} from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
const RequireAuth = ({children}) => {
  let location = useLocation();
  const user = useSelector(state => state.userReducer.user);
  console.log('authentication checking',user)
  // const [auth] = useState(null);
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{from: location}} replace />;
    // return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
