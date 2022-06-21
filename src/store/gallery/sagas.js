import { put, call, takeLatest} from '@redux-saga/core/effects'
import GalleryService from '../../service/GalleryService'
import { setGalleries, getGalleries } from './gallerySlice';


function* handleGetGalleries(action){
    const galleries = yield call(GalleryService.getGalleries, action.payload);
    yield put(setGalleries(galleries))
}
export function* watchGetGalleries(){
    yield takeLatest(getGalleries.type, handleGetGalleries);
}
