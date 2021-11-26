import axios from 'axios';
import { ref } from 'vue';
import without from 'lodash/without';
import { API_BASE_URL } from '@/constants';

export default function (api) {
  const items = ref([1]);
  const selectedIds = ref([]);
  const isLoading = ref(false);
  const isLoadingError = ref(false);
  const error = ref(null);

  const selectItem = ($event, id) => {
    const isChecked = $event.target.checked;
    if (isChecked) {
      selectedIds.value.push(id);
    } else {
      selectedIds.value = without(selectedIds.value, id);
    }
    return selectedIds.value;
  };

  const loadItems = async (params) => {
    isLoading.value = true;
    isLoadingError.value = false;

    try {
      const response = await axios.get(API_BASE_URL + api, params);
      items.value = response.data;

      isLoading.value = false;
    } catch (err) {
      isLoadingError.value = true;
      isLoading.value = false;
      error.value = err.response.data;
      console.log('error', err.response.data);
    }
  };

  return {
    items,
    isLoading,
    isLoadingError,
    error,
    loadItems,
    selectItem,
  };
}
