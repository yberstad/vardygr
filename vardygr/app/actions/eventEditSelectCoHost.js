import { EVENT_EDIT_SELECT_CO_HOSTS } from '../constants/actions'

export default (coHostList) => {
    return{
        type: EVENT_EDIT_SELECT_CO_HOSTS,
        coHostList
    }
}