import { put, call, takeLatest} from '@redux-saga/core/effects'
import { getActiveUser, setActiveUser, register, login, logout, setToken } from './userSlice';
import UserService from '../../service/UserService';


function* handleRegister(action){
    try{
        const {user, token} = yield call(UserService.register, action.payload);
        yield put(setActiveUser(user));
        yield put(setToken(token));

    }catch(error){
        throw new Error("Check register worker", error.message);
    }
}
function* handleLogin(action){
        try{
            const {user, token} = yield call(UserService.login, action.payload);
            yield put(setActiveUser(user));
            yield put(setToken(token))

        }catch(error){
            throw new Error("Check login worker")
        }
    }
function* handleLogout(){
        try{
            yield call(UserService.logout);
            yield put(setActiveUser(null));
            yield put(setToken(null));
        }catch(error){
            throw new Error("Check logout worker")
        }
    }
function* handleActiveUser(){
        try{
            const activeUser = yield call(UserService.getActiveUser);
            yield put(setActiveUser(activeUser));
        }catch(error){
         throw new Error("Check active user worker")
    }
    }


///watchers

export function* watchRegister(){
    yield takeLatest(register.type, handleRegister);
}
export function* watchLogin(){
    yield takeLatest(login.type, handleLogin);
}
export function* watchLogout(){
    yield takeLatest(logout.type, handleLogout)
};
export function* watchActiveUser(){
    yield takeLatest(getActiveUser.type, handleActiveUser)
}