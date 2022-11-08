import { format } from "path"


export default class ExtendFunc {
    // PM16M39S
    convertDuration(duration) {
        let formatTime = duration.replace('PM', '').replace('S', '')
        let a = {
            hours: Number(formatTime.split('M')[0]),
            minutes: Number(formatTime.split('M')[1]),
        }
        
        return a.hours * 60 + a.minutes
    }

}