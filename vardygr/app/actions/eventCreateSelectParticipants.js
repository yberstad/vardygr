import { EVENT_CREATE_SELECT_PARTICIPANTS } from '../constants/actions'

export default (participantList) => {
    return{
        type: EVENT_CREATE_SELECT_PARTICIPANTS,
        participantList
    }
}