import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class Navbar extends React.Component{

    render(){
        return<div>
            {this.props.loged ?
            <Menu>
                <h2>FlatNote</h2>
                <Menu.Item>
                    <Link to='/dashboard' exact>Dashboard</Link>
                </Menu.Item>
                    <Menu.Item>
                <Link to='/note/new' exact>New Note</Link>
                    </Menu.Item>
                <Menu.Item>
                    <Link onClick={this.props.userLogout} to='/' exact> Sign Out</Link>
                </Menu.Item>
            </Menu>
            :
            <Menu>
                <h2>FlatNote</h2>
                <Menu.Item>
                    <Link to='/login'>Login</Link>
                </Menu.Item>
                
                <Menu.Item>
                    <Link to='/sign-up'>Sign Up</Link>
                </Menu.Item>
            </Menu>
            }
        </div>
    }
}

export default Navbar