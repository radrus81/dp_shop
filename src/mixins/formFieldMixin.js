import AppFormField from '@/components/Order/AppFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'modelValue'],
  emits: ['update:modelValue'],
  components: { AppFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
