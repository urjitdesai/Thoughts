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
import {connect } from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

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
          margin: '20px auto 10px auto'
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



export class login extends Component {

    constructor(){
        super()
        this.state={
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }
    
    handleSubmit= (event)=>{
        event.preventDefault()

        const userData={
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
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
                    <Typography variant='h3' className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange= {this.handleChange}
                            fullWidth>
                                
                        </TextField>

                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField}
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange= {this.handleChange}
                            fullWidth>
                                
                        </TextField>
                        {
                            errors.error && (
                            <Typography variant='body2' className={classes.customError}>{errors.error}</Typography>
                            )
                        }
                        <Button className={classes.button} disabled={loading} type='submit' variant='contained' color='primary'>
                            Login
                            {loading && (
                                <CircularProgress size={20} className={classes.progress}/>
                            )}
                        </Button>
                        <br></br>
                        <small>Don't have an account? <Link to='/signup'>Sign Up</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    user: state.user,
    UI: state.UI
})

const mapActionToProps= {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login))
