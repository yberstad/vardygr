import { EVENT_EDIT_SELECT_PARTICIPANTS } from '../constants/actions'

export default (participantList) => {
    return{
        type: EVENT_EDIT_SELECT_PARTICIPANTS,
        participantList
    }
}