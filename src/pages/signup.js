import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/logo192.png'

//MUI STUFF
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

//REDUX STUFF
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

const styles= {
    form: {
        textAlign: 'center'
      },
      image: {
          margin: '20px auto 10px auto',
          maxHeight: '100px'
      },
      pageTitle: {
          margin: '10px auto 20px auto'
      },
      textField: {
          margin: '10px auto 0px auto'
      },
      button:{
          marginTop: 15,
          position: 'relative'
      },
      customError: {
          color: 'red'
      },
      progress: {
          position: 'absolute'
      },
}



export class signup extends Component {

    constructor(){
        super()
        this.state={
            email: '',
            password: '',
            confirmPassword: '',
            handke: '',
            loading: false,
            errors: {}
        }
    }
    
    handleSubmit= (event)=>{
        event.preventDefault()
        this.setState({
            loading: true
        })

        const newUserData={
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        this.props.signupUser(newUserData, this.props.history)
        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }
    handleChange =(event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        const {classes, UI: {loading}}= this.props;
        const {errors}= this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img className={classes.image} src={AppIcon} alt="App Icon "></img>
                    <Typography variant='h3' className={classes.pageTitle}>Sign Up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id='email' 
                            name='email' 
                            type='email' 
                            label='Email' 
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange= {this.handleChange}
                            fullWidth>
                                
                        </TextField>

                        <TextField 
                            id='password'
                            name='password' 
                            type='password' 
                            label='Password' 
                            className={classes.textField}
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange= {this.handleChange}
                            fullWidth>
                                
                        </TextField>

                        <TextField 
                            id='confirmPassword'
                            name='confirmPassword' 
                            type='password' 
                            label='Confirm Password' 
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange= {this.handleChange}
                            fullWidth>
                                
                        </TextField>

                        <TextField 
                            id='handle'
                            name='handle' 
                            type='text' 
                            label='User Handle' 
                            className={classes.textField}
                            value={this.state.handle}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            onChange= {this.handleChange}
                            fullWidth>
                                
                        </TextField>
                        {
                            errors.error && (
                            <Typography variant='body2' className={classes.customError}>{errors.error}</Typography>
                            )
                        }
                        <Button className={classes.button} disabled={loading} type='submit' variant='contained' color='primary'>
                            Sign Up
                            {loading && (
                                <CircularProgress size={20} className={classes.progress}/>
                            )}
                        </Button>
                        <br></br>
                        <small>Already have an account? <Link to='/login'>Login</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps= state => ({
    user:state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup))
