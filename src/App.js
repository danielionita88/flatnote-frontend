import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './components/Navbar'
import Dashboard from './containers/Dashboard'
import CreateNote from './components/CreateNote'
import SignUpForm from './components/SignUpForm'


class App extends React.Component {


  setNote = (routeParams) =>{
    const id=routeParams.match.params.noteId
    const clickedNote=this.props.notes.find(note => note.id ===parseInt(id))
    return clickedNote
  }

  render(){
    return (
      <Router>
        <div >
          <Route path='/' component={()=><Navbar userLogout={this.props.userLogout} 
          loged={this.props.login}/> 
          }/>
          <Route path='/dashboard'  render={(routeParams)=><Dashboard {...routeParams}
          user={this.props.login}
          />}/>
          <Route exact path='/note/new' render={(routeParams)=><CreateNote {...routeParams} user={this.props.login}
          createNote={this.props.createNote}/>}/>
          <Route exact path='/login' render={(routeParams)=> <LoginForm {...routeParams} userLogin={this.props.userLogin}/>}/>
          <Route exact path='/sign-up' render={(routeParams)=><SignUpForm {...routeParams}
          userLogin={this.props.userLogin}/>}/>
        
        </div>
      </Router>
    );
  }
}

const mapStateToProps= state=>{
  return ({
    login: state.login,
    notes: state.notes
  })
}

const mapDispatchToProps=dispatch=>{
  return{
    userLogin: user => dispatch({type: 'LOGIN', user}),
    createNote: note => dispatch({type: 'CREATE_NOTE', note}),
    userLogout: () => dispatch({type: 'LOGOUT'})

  }
}

export default connect (mapStateToProps, mapDispatchToProps)(App);
