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
}
