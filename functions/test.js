import formattedReturn from './helpers/formattedReturn';
import Starfire from './helpers/starfire';

export const handler = async(event) => {
    let schedule = await Starfire.schedule.get()
    if(schedule.error) return formattedReturn(418, schedule)
    return formattedReturn(200,schedule)
};