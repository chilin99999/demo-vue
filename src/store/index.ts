import { createStore } from 'vuex';
import optimism from '@/lib/optimism.ts';
import delay from '@/lib/delay.ts';

export default createStore({
  state: {
    records: [] as Array<string>,
  },
  mutations: {
    setRecords(state, records: Array<string>): void {
      state.records = records;
    },
  },
  actions: {
    getRecords({ state, commit }): void {
      const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

      optimism.cache('console', async() => {
        console.log('waiting for a very time-consuming api...');
        await delay(1000 * 5);
        const records = state.records.slice();
        const length = state.records.length;
        records.push(items[length]);
        return records;
      }, (value: unknown) => {
        console.log('update value as:', value);
        commit('setRecords', value);
      });
    },
    clearRecords({ commit }): void {
      optimism.clear();
      commit('setRecords', []);
    },
  },
  modules: {
  },
});
