import axios from 'axios';

//Validate user username
export const UPDATE_USER_USERNAME = 'UPDATE_USER_USERNAME';
export const UPDATE_USER_USERNAME_SUCCESS = 'UPDATE_USER_USERNAME_SUCCESS';
export const UPDATE_USER_USERNAME_FAILURE = 'UPDATE_USER_USERNAME_FAILURE';
export const RESET_UPDATE_USER_USERNAME = 'RESET_UPDATE_USER_USERNAME';

export const VALIDATE_USER_USERNAME = 'VALIDATE_USER_USERNAME';
export const VALIDATE_USER_USERNAME_SUCCESS = 'VALIDATE_USER_USERNAME_SUCCESS';
export const VALIDATE_USER_USERNAME_FAILURE = 'VALIDATE_USER_USERNAME_FAILURE';
export const RESET_VALIDATE_USER_USERNAME = 'RESET_VALIDATE_USER_USERNAME';


export function validateUserUsername(props) {
    const request = axios({
        method: 'post',
        data: props,
        url: '/api/user/validate/username',
    });

    return {
        type: VALIDATE_USER_USERNAME,
        payload: request
    };
}

export function validateUserUsernameSuccess() {
    return {
        type: VALIDATE_USER_USERNAME_SUCCESS
    };
}

export function validateUserUsernameFailure(error) {
    return {
        type: VALIDATE_USER_USERNAME_FAILURE,
        payload: error
    };
}

export function resetUserUsername() {
    return {
        type: RESET_VALIDATE_USER_USERNAME
    }
};

export function updateUser(id, user) {
    const request = axios({
        method: 'put',
        data: user,
        url: `/api/user/${id}`,
    });
  
    return {
      type: UPDATE_USER_USERNAME,
      payload: request
    };
}
 
export function updateUserSuccess(user) {
    return {
        type: UPDATE_USER_USERNAME_SUCCESS,
        payload: user
    };
}
  
export function updateUserFailure(error) {
    return {
        type: UPDATE_USER_USERNAME_FAILURE,
        payload: error
    };
}
  
export function resetUpdateUserState() {
    return {
        type: RESET_VALIDATE_USER_USERNAME
    };
}