import { EVENT_CREATE_SELECT_DATE_TIME } from '../constants/actions'

export default (startDateTime) => {
    return{
        type: EVENT_CREATE_SELECT_DATE_TIME,
        startDateTime
    }
}