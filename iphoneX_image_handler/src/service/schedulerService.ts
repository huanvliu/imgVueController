import Schedule from 'node-schedule';
import moment from 'moment';
import ImgMetaLoad from './imgMetaLoad';

export default class ScheduleService {
    public static async start() {
        Schedule.scheduleJob('1 * * * * *', async () => {
            console.log("load data......");
            ImgMetaLoad.load();
        });
    }
}
