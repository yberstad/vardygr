import { EVENT_CREATE_SELECT_DATE_TIME } from '../constants/actions'

export default (startDate) => {
    return{
        type: EVENT_CREATE_SELECT_DATE_TIME,
        startDate
    }
}