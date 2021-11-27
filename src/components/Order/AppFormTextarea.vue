<template>
  <app-form-field :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      name="name"
      :placeholder="placeholder"
      v-model="dataValue"
    ></textarea>
  </app-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};

</script>

<style></style>
