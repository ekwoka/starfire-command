import * as Starfire from '../starfire';

export default function (Alpine) {
  Alpine.data('operationsSnippet', () => ({
    operations: [],
    totalOps: -1,
    async init() {
      let auth = localStorage.getItem('STARFIRE_AUTH');
      if (!auth) return;
      let data = {
        auth,
        type: 'snippet'
      };
      let ops = await Starfire.api('operations', data);
      if (ops.error) return console.error(ops.error);
      this.totalOps = ops.length;
      this.operations = ops.slice(0, 3);
      this.operations.forEach((op) => (op.hoursUntil = (op.time - Date.now()) / 3600000));
    },
    getTime(time, option) {
      return Starfire.time(time, option);
    },
    getHours(time) {
      return Math.floor((time - Date.now()) / 3600000);
    }
  }));

  Alpine.data('operationsList', () => ({
    operations: [],
    totalOps: -1,
    async init() {
      let auth = localStorage.getItem('STARFIRE_AUTH');
      if (!auth) return;
      let data = {
        auth,
        type: 'snippet'
      };
      let ops = await Starfire.api('operations', data);
      if (ops.error) return console.error(ops.error);
      this.totalOps = ops.length;
      this.operations = ops;
      this.operations.forEach((op) => (op.hoursUntil = (op.time - Date.now()) / 3600000));
    },
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
      get displayDate() {
        let [time, day] = [this.hour, parseInt(this.day)];
        let hour = parseInt(time.slice(-4, -2));
        let minute = parseInt(time.slice(-2));
        let date = new Date();

        day = day >= 1 ? day : date.getUTCHours() > hour ? 1 : 0;

        date.setUTCHours(hour?hour:0);
        date.setUTCMinutes(minute);
        date.setUTCSeconds(0);
        date.setUTCDate(date.getUTCDate() + day);
        return `${Starfire.time(date,'time')} ${Starfire.time(date,'date')}`;
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
        if (this.time.hour <= 0) return (this.time.hour = '0000');
        time = this.time.hour.toString();

        hour = time.slice(-4, -2);
        minute = time.slice(-2);

        if (minute >= 60) {
          hour = (parseInt(hour) + 1).toString();
          minute = '00';
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
    }
  }));
}
