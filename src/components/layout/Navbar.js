import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
//MATERIAL UI STUFF
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
//ICONS STUFF
import HomeIcon from '@material-ui/icons/Home'
import Notifications from './Notifications'
import PostScream from '../scream/PostScream'

export class Navbar extends Component {
    render() {

        const {authenticated} = this.props
        return (
            <AppBar title= "Thoughts">
                <Toolbar className='nav-container'>
                {/* <Typography variant="h6" >
      News
    </Typography> */}
                    {authenticated ? (
                        <>
                        <PostScream></PostScream>
                        <Link to='/'>
                        <MyButton tip='Home'>
                            <HomeIcon color='primary'/>
                        </MyButton>
                        </Link>
                        
                            <Notifications/>
                        
                        </>
                    ) : (                    
                        <>
                            <Button color='inherit' component={Link} to='/login'>Login</Button>
                    <Button color='inherit' component={Link} to='/'>Home</Button>
                    <Button color='inherit' component={Link} to='/signup'>SignUp</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}
Navbar.propTypes={
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
