import * as Starfire from '../starfire';

export default function (Alpine) {
  Alpine.data('operationsList', () => ({
    operations: [],
    totalOps: -1,
    async init() {},
    getTime(time, option) {
      return Starfire.time(time, option);
    },
    getHours(time) {
      return Math.floor((time - Date.now()) / 3600000);
    }
  }));

  Alpine.data('operationsBuilder', ({} = {}) => ({
    name: '',
    time: {
      hour: '0000',
      day: '',
      get date(){
        let [time, day] = [this.hour, parseInt(this.day)];
        let hour = parseInt(time.slice(-4, -2));
        let minute = parseInt(time.slice(-2));
        let date = new Date();

        day = day >= 1 ? day : date.getUTCHours() > hour ? 1 : 0;

        date.setUTCHours(hour?(hour==24&&minute>0)?0:hour:0);
        date.setUTCMinutes(minute);
        date.setUTCSeconds(0);
        date.setUTCDate(date.getUTCDate() + day);
        return date
      },
      get hoursUntil(){
        return (this.dateMS - Date.now()) / 3600000
      },
      get dateMS(){
        return this.date.valueOf()
      },
      get displayDate() {
        return `${Starfire.time(this.date,'time')} ${Starfire.time(this.date,'date')}`;
      }
    },
    commander: '',
    location: {
      x: '',
      y: ''
    },
    description: '',
    validate: {
      location() {
        Object.entries(this.location).forEach(([key, value]) => {
          this.location[key] = value.replace(/[^\d]+/g, '').slice(0, 4);
        });
      },
      hour() {
        let time, hour, minute;
        if (this.time.hour < 0) return (this.time.hour = '2359');
        time = this.time.hour.toString();

        hour = time.slice(-4, -2);
        minute = time.slice(-2);

        if (minute >= 60) {
          hour = (parseInt(hour?hour:0) + (minute<=80?1:0)).toString();
          minute = (minute>=80?'59':'00');
        }
        if (parseInt(hour) >= 24) {
          hour = '00';
        }
        this.time.hour = hour + minute;
      },
      day() {
        let day = this.time.day;
        this.time.day = day <= 0 ? 0 : day >= 14 ? 14 : day;
      }
    },
    get submitDisable(){
    return !(this.name&&this.time.dateMS&&this.commander&&this.location.x&&this.location.y&&!this.submitting)
    },
    async submitOperation(){
      this.submitting = true
      let op = {
        location: {
          x: this.location.x,
          y: this.location.y
        },
        name: this.name,
        operator: {
          id: 'none',
          name: this.commander
        },
        loggedAt: Date.now(),
        time: this.time.dateMS
      }
      try {
        let response = await Starfire.api('operationsAdd',op)
        if(response.error) throw response.error
        Alpine.store('operations').updateList(response)
        this.submitting = false
        this.submitted = true
      } catch(e) {
        console.error(e)
        this.submitting = false
      }
    },
    submitting: false,
    submitted: false
  }));
}
