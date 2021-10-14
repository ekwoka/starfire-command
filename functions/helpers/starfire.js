import * as cls from "./cls";

export const schedule = {
  async get() {
    let schedule = await cls.getItem("schedule");
    if (!schedule) return { error: "No schedule Found" };
    return schedule;
  },
  async set(value) {
    if (!Array.isArray(value))
      return { error: "Schedule Value is not an Array" };
    return await cls.setItem("schedule", value);
  }
};

export const login = {
  async get() {
    let users = await cls.getItem("userAuth");
    if (!users) return { error: "No Users Found" };
    return users;
  },
  async set(value) {
    return { error: "You cannot set Users from this endpoint" };
  }
};

export const users = {
  async get(ID) {
    let users = await cls.getItem("userAuth");
    if (!users[ID]) return { error: "User not found" };
    return users[ID];
  },
  async add(userData) {
    let users = await cls.getItem("userAuth");
    let ID =
      Object.entries(users).find(
        ([key, value]) => value.id == userData.id
      )?.[0] || Date.now().toString(36) + Math.random().toString(36).substr(2);
    users[ID] = userData;
    await cls.setItem("userAuth", users);
    return ID;
  }
};

export const operations = {
  async get(type) {
    let operations = await cls.getItem("operations");
    operations = cleanOperations(operations)
    cls.setItem("operations", operations)
    return operations;
  },
  async add(op) {
    let operations = await cls.getItem("operations");
    operations.push(op);
    operations = operations.sort((a, b) => {
      return a.time - b.time;
    });
    await cls.setItem("operations", operations);
    return operations;
  }
};

function cleanOperations(ops){
  ops = ops.filter(op=>{
    return (2600000+op.time-Date.now())>=0?true:false
  })
  ops = ops.sort((a, b) => {
    return a.time - b.time;
  });
  return ops
}
