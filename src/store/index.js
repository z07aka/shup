import { defineStore } from 'pinia'

export const requestStore = defineStore('requests', {
  state: () => ({ req: {}, res: [] }),
  getters: {
    get_req: state => state.req,
    get_res: state => state.res,
  },
  actions: {
    save_req(obj) {
      this.req = JSON.stringify(obj, null, '  ');
    },
    save_res(array) {
      this.res.push(array);
    }
  },
})
