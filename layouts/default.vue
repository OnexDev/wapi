<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link to="/">
          <span class="is-primary">weather.api</span>
        </nuxt-link>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2">
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Все города",
          icon: "home",
          to: { name: "index" }
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.columns {
  margin: 0;
}
.navbar {
  padding: 0 15px;
}
.navbar.header {
  a {
    color: $white;
    margin: auto 0;
    line-height: 1;
  }
  a:hover {
    color: darken($white, 15%);
  }
}
</style>
