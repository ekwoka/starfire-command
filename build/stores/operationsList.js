export default function (Alpine) {
  Alpine.store('operations', {
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
      this.updateList(ops)
    },
    updateList(ops){
        this.totalOps = ops.length;
        this.operations = ops
        this.operations.forEach((op) => (op.hoursUntil = (op.time - Date.now()) / 3600000));
    }
  });
}
