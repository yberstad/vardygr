import { EVENT_EDIT_SELECT_LOCATION } from '../constants/actions'

export default (longitude, latitude, longitudeDelta, latitudeDelta) => {
    return{
        type: EVENT_EDIT_SELECT_LOCATION,
        longitude,
        latitude,
        longitudeDelta,
        latitudeDelta
    }
}