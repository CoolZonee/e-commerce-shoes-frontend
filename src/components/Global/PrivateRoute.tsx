import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
type RouteProps = {
    component: Component,
}

// function PrivateRoute({ component, ...rest }: RouteProps) {
//     return (
//         <Route {...rest} render={props => {
//             const account = accountService.accountValue;
//             if (!account) {
//                 return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//             }
//             return <Component {...props} />
//         }} />
//     );
// }

// export { PrivateRoute };

