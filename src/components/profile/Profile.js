import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import {logoutUser, uploadImage} from '../../redux/actions/userActions'
import EditDetails from './EditDetails'
//MUI STUFF
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
//ICONS
import  LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import MyButton from '../../util/MyButton'

const styles= theme => ({
    ...theme.spreadThis
})

class Profile extends Component {

    handleImageChange= event => {
        const image=event.target.files[0]
        // send to server
        const formData= new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleEditPicture= () =>{
        const fileInput= document.getElementById('imageInput')
        fileInput.click()
    }

    handleLogout = ()=> {
        this.props.logoutUser()
    }

    render() {
        const { classes, user: {
            credentials: { handle, createdAt, imageUrl, bio, website, location},
            loading,
            authenticated
        }} = this.props

        let profileMarkup = !loading ? ( authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img className='profile-image' src={imageUrl} alt="profile picture"/>
                        <input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                        <MyButton tip='Edit profile picture' onClick={this.handleEditPicture} btnClassName='button'>
                            <EditIcon color='primary'></EditIcon>
                        </MyButton>
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                            @{handle}
                        </MuiLink>
                        <hr/>
                        { bio && <Typography variant='body2'>{bio}</Typography>}
                        <hr/>
                        {location && (
                        <>
                        <LocationOn color='primary'/> <span>{location}</span>
                        <hr/>
                        </>
                        )}
                        {website && (
                            <>
                            <LinkIcon color='primary'/>
                            <a href={website} target='_blank' rel='nonopener nonreferrer'>
                            {' '}{website}
                            </a>
                            <hr/>
                            </>
                        )}
                        <CalendarToday color='primary'/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton tip='Logout' onClick={this.handleLogout} btnClassName='button'>
                            <KeyboardReturn color='primary'></KeyboardReturn>
                        </MyButton>
                    <EditDetails></EditDetails>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No Profile Found, please login again
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>SignUp</Button>
                    </div>
                </Typography>
            </Paper>
        )) : (<p>Loading ...</p>)

        return profileMarkup
    }
}

const mapStateToProps= (state)=> ({
    user: state.user
})

const mapActionsToProps= {logoutUser, uploadImage}

Profile.propTypes={
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
