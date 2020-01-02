import React from 'react'
import { Link } from 'react-router-dom'


class Navbar extends React.Component{

    render(){
        return<div>
            {this.props.loged ?
            <div>
                <h2>FlatNote</h2>
                <Link to='/dashboard' exact>Dashboard</Link>
                <Link to='/note/new' exact>New Note</Link>
                <Link onClick={this.props.userLogout} to='/' exact> Sign Out</Link>
            </div>
            :
            <div>
                <h2>FlatNote</h2>
                <Link to='/login'>Login</Link>
                <Link to='/sign-up'>Sign Up</Link>
            </div>
            }
        </div>
    }
}

export default Navbar