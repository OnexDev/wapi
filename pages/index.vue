<template>
  <!-- class="section" -->
  <section>
    <!-- {{ data }} -->
    <b-field>
      <b-input placeholder="Название" v-model="filterByName"></b-input>
    </b-field>
    <b-field>
      <b-checkbox v-model="filterByWeather">
        Включать только районы где сейчас ясно
      </b-checkbox>
    </b-field>
    <b-field>
      <b-radio-button
        v-model="sortParam"
        native-value="name"
        type="is-primary is-light is-outlined"
      >
        <span>Название</span>
      </b-radio-button>

      <b-radio-button
        v-model="sortParam"
        native-value="temp"
        type="is-primary is-light is-outlined"
      >
        <span>Температура</span>
      </b-radio-button>
    </b-field>

    <div v-if="orderedItems != 0">
      <ul class="weather-info">
        <li v-for="item in orderedItems" :key="item.name">
          <!-- {{ item.id }} -->
          <NuxtLink
            :to="{ name: 'posts-id', params: { id: item.id, name: item.name } }"
          >
            <div class="wrapper">
              <img
                :src="
                  `https://openweathermap.org/img/wn/${item.weather[0]['icon']}.png`
                "
              />
            </div>
            <span>
              {{ item.name }} - {{ item.weather[0].description }} -
              {{ getCelseTemp(item.main.temp) }}&deg;
            </span>
          </NuxtLink>
          <img
            class="del"
            src="@/assets/img/close.svg"
            @click="removeCity(item)"
            alt=""
          />
        </li>
      </ul>
    </div>
    <div class="" v-else-if="errors != ''">
      Произошла критическая ошибка!<br />
      Error: {{ errors }}
    </div>
    <div class="" v-else>
      <span>Выгружаем данные по городам...</span>

      <b-progress type="is-primary mt"></b-progress>
    </div>
    <div class="flex">
      <b-field :type="input_type" label="Название города (eng)">
        <b-input v-model="inputValueOfCity"></b-input>
      </b-field>
      <b-button type="is-primary" @click="addNewCity">Добавить</b-button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomePage",

  components: {
    // Card
  },
  watch: {
    errors() {
      if (this.errors == "Введите корректный город")
        // console.log(this.errors);
        this.input_type = "is-danger";
    }
  },
  data() {
    return {
      filterByName: "",
      filterByWeather: false,

      sortParam: "name",

      input_type: "",

      inputValueOfCity: "",
      radioButton: "",
      errorPull: ""
    };
  },
  created() {
    // this.$nuxt.$on("changedItem", obj => {});
  },
  computed: {
    ...mapState({
      items: state => state.items,
      errors: state => state.error
    }),
    filteredItems: function() {
      var name = this.filterByName;
      var weather = this.filterByWeather;

      return this.items.filter(function(elem) {
        if (!weather) {
          if (name === "") return true;
          else return elem.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        } else {
          if (name === "") return true && elem.weather[0].description == "ясно";
          else
            return (
              elem.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
              elem.weather[0].description == "ясно"
            );
        }
      });
    },
    orderedItems() {
      switch (this.sortParam) {
        case "name":
          return this.filteredItems.sort(orderByName);
        case "temp":
          return this.filteredItems.sort(orderByTemp);
        default:
          return this.filteredItems;
      }
    }
  },

  methods: {
    getCelseTemp(data) {
      return Math.round(data - 273);
    },
    addNewCity(e) {
      this.input_type = "is-primary";
      this.$store
        .dispatch("fetchByName", this.inputValueOfCity)
        .catch(error => {
          console.log("Error" + error.message);
          errorPull.push(error.message);
          // this.input_type = "is-danger";
          // this.commit("add_error", error.message);
        });
    },
    removeCity(item) {
      this.$store.commit("REMOVE_ITEM", item);
    }
  },
  mounted() {
    this.$store.dispatch("fetchSomething");
  }
};
var orderByName = function(d1, d2) {
  return d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1;
};
var orderByTemp = function(d1, d2) {
  return d1.main.temp < d2.main.temp ? 1 : -1;
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .field:not(:last-child) {
    margin-bottom: 0;
  }
  .field {
    width: calc(100% - 120px);
  }
  .button {
    // margin: 0 auto;
  }
}

.field.has-addons {
  .control {
    width: 100%;
  }
}
.progress-wrapper {
  margin-top: 15px;
}
.b-checkbox {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.b-checkbox.checkbox input[type="checkbox"]:focus:checked + .check {
  box-shadow: none;
}
p.help {
  position: absolute;
}
.weather-info {
  li {
    display: flex;
    align-items: center;
    // justify-content: ;
    margin: 15px 0;
    a {
      display: flex;
      align-items: center;
      // justify-content: ;
      margin: 15px 0;
    }
    img.del {
      width: 15px;
      margin-left: auto;
      justify-self: flex-end;
      // stroke: red;
      opacity: 0.5;
      cursor: pointer;
    }
    .wrapper {
      // border: solid $primary 2px;
      background: $primary;
      min-width: 50px;
      width: 50px;
      height: 50px;
      display: block;
      position: relative;
      margin-right: 15px;
      border-radius: 50%;
      img {
        // mix-blend-mode: screen;
        mix-blend-mode: color-dodge;
        // mix-blend-mode: luminosity;
      }
    }
  }
}
</style>
