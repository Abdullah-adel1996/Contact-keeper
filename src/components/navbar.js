import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/auth';

 const navbar = (props) => {
  const handleLogout = e => {
    e.preventDefault();
    props.dispatch(logOut())
   };
  
    return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to = '/'>
        <i className="fas fa-id-card-alt" /> Contact Keeper
        </Link>        
      </h1>   
      {!props.auth.isAuth? 
      <ul>
        <li>
            <Link to = '/'>Register</Link>
        </li>
        <li>
            <Link to = 'login'>Login</Link>
        </li>
      </ul>
      :
      <ul>
        <li onClick={handleLogout}>logOut</li>
      </ul>
       }
      
    </nav>
    )
}
// {
//   "rules": {
//     ".read": true,
//     ".write": true
//   }
// }
const mapStateToProps = ({auth}) => {
  return {auth}
}

export default connect(mapStateToProps) (navbar)
