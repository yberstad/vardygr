import { EVENT_CREATE_SELECT_LOCATION } from '../constants/actions'

export default (longitude, latitude, longitudeDelta, latitudeDelta) => {
    return{
        type: EVENT_CREATE_SELECT_LOCATION,
        longitude,
        latitude,
        longitudeDelta,
        latitudeDelta
    }
}