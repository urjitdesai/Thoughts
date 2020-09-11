import { SET_ERRORS, LIKE_SCREAM, UNLIKE_SCREAM, SET_USER, SET_AUTHENTICATED, LOADING_USER, SET_UNAUTHENTICATED, CLEAR_ERRORS, LOADING_UI, MARK_NOTIFICATIONS_READ } from "../types";

const initialState={
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications:[]
}

export default function( state= initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        
        case SET_UNAUTHENTICATED:
            return initialState
        
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach( not => not.read = true)
            return {
                ...state
            }
        
        case SET_USER:
            return{ 
                authenticated: true,
                ...action.payload
            }
        
        case LOADING_USER:
            return { ...state,
            loading:true}
        
        case LIKE_SCREAM:
            return{
                ...state,
                likes: [ ...state.likes, 
                {
                    userHandle: state.credentials.handle,
                    screamId: action.payload.screamId
                }]
            }
        
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(
                    like => like.screamId !== action.payload.screamId
                )
            }
        default: return state;
    }
}