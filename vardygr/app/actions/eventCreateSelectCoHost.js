import { EVENT_CREATE_SELECT_CO_HOSTS } from '../constants/actions'

export default (coHostList) => {
    return{
        type: EVENT_CREATE_SELECT_CO_HOSTS,
        coHostList
    }
}