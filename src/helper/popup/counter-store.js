class CounterStore {
  config = {
    confirm: {
      YES: 'YES',
      NO: 'NO',
    },
  };
  setAlert = null;
  setFullAlert = null;
  setBottomAlert = null;
  setModal = null;
  setBottomModal = null;
  setLoader = null;

  setConfig(config) {
    this.config = {
      ...config,
    };
  }
}

const counterStore = new CounterStore();
export default counterStore;
