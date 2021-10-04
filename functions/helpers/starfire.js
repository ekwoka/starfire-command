import * as cls from './cls';

export const schedule = {
  async get() {
    let schedule = await cls.getItem("schedule")
        if(!schedule) return ({ error: "No schedule Found" })
        return schedule
  },
  async set(value) {
    if (!Array.isArray(value))
      return ({ error: "Schedule Value is not an Array" });
    return await cls.setItem("schedule", value);
  }
};

export const login = {
    async get() {
        let users = await cls.getItem("userAuth")
        if(!users) return ({ error: "No Users Found" })
        return users
    },
    async set(value) {
        return ({ error: "You cannot set Users from this endpoint" })
    }
};