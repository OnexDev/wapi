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
      this.$nuxt.$emit("changedItem", {
        id: this.$route.params.id,
        message: this.inputValue
      });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.inputValue = this.$route.params.name;
  }
};
</script>
