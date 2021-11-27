<template>
  <app-form-field :title="title" :error="error">
    <input
      class="form__input"
      :type="type"
      name="name"
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </app-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style></style>
