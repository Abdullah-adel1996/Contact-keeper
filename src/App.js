import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/navbar';
import Register from './components/register';
import Login from './components/login';
import contacts from './components/contacts';
import { connect } from 'react-redux'


const app = (props) => {
  return (
    
     <Fragment>
        <Navbar/>
     <div className='container'>
       {!props.auth.isAuth ? <Redirect to="/register" /> : <Redirect to="/" />}
          <Switch>
            <Route exact path="/" component={contacts}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login} />
          </Switch>
    </div>
    </Fragment>
  );
}
const mapStateToProps = ({auth}) => {
return {
  auth
}
}
export default connect(mapStateToProps)(app);
