
import { SET_ERRORS,LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, CLEAR_ERRORS, LOADING_UI, MARK_NOTIFICATIONS_READ } from "../types";
import axios from 'axios'
export const loginUser= (userData, history) => (dispatch) => {
    
    dispatch({type: LOADING_UI})
    axios.post('/login', userData)
            .then(res => {

                setAuthorizationHeader(res.data.token)
                dispatch(getUserData())
                dispatch({type: CLEAR_ERRORS})
                history.push('/')
            })
            .catch( err=> {
                console.log("CATCH BLOCK");
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                
                })
                //console.log(this.state.errors);
            })
}

export const signupUser= (newUserData, history) => (dispatch) => {
    
    dispatch({type: LOADING_UI})
    axios.post('/signup', newUserData)
            .then(res => {
                setAuthorizationHeader(res.data.token)
                dispatch(getUserData())
                dispatch({type: CLEAR_ERRORS})
                history.push('/')
            })
            .catch( err=> {
                console.log("CATCH BLOCK");
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                
                })
                //console.log(this.state.errors);
            })
}

export const logoutUser=()=> (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({
        type: SET_UNAUTHENTICATED
    })
}
export const getUserData= () => (dispatch) => {
    
    dispatch({type: LOADING_USER})
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch( err=> console.log(err))
}

const setAuthorizationHeader= token => {
    const FBIdToken= `Bearer ${token}`
    localStorage.setItem('FBIdToken', `Bearer ${token}`)
    axios.defaults.headers.common['Authorization']=  FBIdToken
}

export const uploadImage=(formData)=> (dispatch)=> {
    dispatch({type: LOADING_USER})
    axios.post('/user/image', formData)
    .then(()=> {
        dispatch(getUserData())
    })
    .catch( err=>console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) =>{
    dispatch({type: LOADING_USER})
    axios.post('/user', userDetails)
    .then( () =>{
        dispatch(getUserData())
    })
    .catch(err=> console.log(err))
}

export const markNotificationsRead= (notificationIds) => (dispatch) => {
    axios.post('/notifications', notificationIds)
        .then( res => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch( err => console.log(err))
}