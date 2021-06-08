export const state = () => ({
  cities: [524925, 525184, 524901, 536203, 1486209, 1489425, 1489474, 554234],
  items: [],
  error: ""
});
export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  PUSH_ITEM(state, item) {
    state.items.push(item);
  },

  REMOVE_ITEM(state, item) {
    var idx = state.items.indexOf(item);
    state.items.splice(idx, 1);
  },
  CHANGE_ITEMNAME(state, params) {
    console.log(params.val);
    state.items.forEach((element, i) => {
      if (element.id === params.id) state.items[i].name = params.val;

      // else console.log("")
      // $set(state.items[i].name, newname);
    });
    console.log(state.items);
    // state.items.forEach(element => {
    //   if (element.name === id) this.$set(state.items.element.name, newname);
    // });
  },

  add_error(state, errormsg) {
    // state.errors.push(error);
    state.error = errormsg;
  },
  clear_error(state) {
    // state.errors = [];
    state.errors = "";
  }
};
export const actions = {
  async fetchSomething(store) {
    if (this.state.items == 0) {
      this.commit("clear_error");
      await this.state.cities.forEach((item, i) => {
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${item}&lang=ru&appid=a7b7478ece778d4363053ebdbadd7249`
        )
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              return response;
            } else {
              let error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
          })
          .then(response => response.json())
          .then(json => {
            this.commit("PUSH_ITEM", json);
            return this.state.items;
          })
          .catch(error => {
            console.log("Error: " + error.message);
            this.commit("add_error", error.message);
          });
      });
    }
  },

  async fetchByName(store, inputValueOfCity) {
    if (inputValueOfCity !== "") {
      this.commit("clear_error");
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValueOfCity}&lang=ru&appid=a7b7478ece778d4363053ebdbadd7249`
      )
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        })
        .then(response => response.json())
        .then(json => {
          this.commit("PUSH_ITEM", json);
          return this.state.items;
        })
        .catch(error => {
          // this.commit("add_error", error.message);
          this.commit("add_error", "Введите корректный город");
          console.log(this.state.error);
        });
    } else {
      console.log("Нет значения");
      this.commit("add_error", "Нет значения");
      //todo
    }
  }
};
