import * as userSagas from './user/sagas'
import * as gallerySagas from './gallery/sagas'


const sagas = {
    ...userSagas,
    ...gallerySagas,
}
export default sagas;