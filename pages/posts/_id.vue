<template>
  <div>
    <div class="wrapper">
      <!-- <img
        :src="
          `https://openweathermap.org/img/wn/${data.weather[0]['icon']}.png`
        "
      /> -->
    </div>
    <div class="flex">
      <b-field label="Название города (eng)">
        <b-input v-model="inputValue"></b-input>
      </b-field>
      <b-button type="is-primary" @click="saveChanges">Сохранить</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // data: [],
      inputValue: ""
    };
  },
  created() {
    // console.log(this.data);
    // this.inputValue = data[0].name;
  },
  methods: {
    saveChanges() {
      this.$root.$emit("changedItem", {
        id: this.$route.params.id,
        message: this.inputValue
      });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    // const asyncAxiosApi = async () => {
    //   await fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?id=${this.$route.params.id}&lang=ru&appid=a7b7478ece778d4363053ebdbadd7249`
    //   )
    //     .then(response => {
    //       if (response.status >= 200 && response.status < 300) {
    //         return response;
    //       } else {
    //         let error = new Error(response.statusText);
    //         error.response = response;
    //         throw error;
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(json => this.data.push(json))
    //     .catch(error => {
    //       this.errorPull = error.message;
    //       console.log("Error: " + error.message);
    //       console.log(error.response);
    //     });
    // };
    // asyncAxiosApi();
    // this.data.forEach(key => {
    //   console.log(key);
    // });
    this.inputValue = this.$route.params.name;
    // console.log(this.$route.params.name);
  }
};
</script>
