<template>
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item">
        <a class="tabs__link"
            :class="{'tabs__link--current': tab === 'info'}"
           @click.prevent="() => showInfoProduct('info')">
          Информация о товаре
        </a>
      </li>
      <li class="tabs__item">
        <a
          class="tabs__link"
          :class="{'tabs__link--current': tab === 'delivery'}"
          @click.prevent="() => showInfoProduct('delivery')"
        >
          Доставка и возврат
        </a>
      </li>
    </ul>

    <div class="item__content" v-if="tab === 'info'">
      <app-alert>
         <p class="message">Информация о товаре будет в ближайшее время.</p>
      </app-alert>
    </div>

    <div class="item__content" v-if="tab === 'delivery'">
      <h3>Доставка:</h3>

      <p>
        1. Курьерская доставка по Москве и Московской области – 290 ₽<br />
        2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br />
      </p>

      <h3>Возврат:</h3>

      <p>
        Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br />
        Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой
        Вы осуществили покупку. БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br />
        Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону
        8 800 600 90 09<br />
      </p>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      tab: 'info',
    };
  },
  methods: {
    showInfoProduct(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style scoped>
  .tabs__link{
    cursor: pointer;
  }
</style>
