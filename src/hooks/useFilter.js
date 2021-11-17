import axios from 'axios';
import { ref } from 'vue';
import without from 'lodash/without';
import { API_BASE_URL } from '@/config';

export default function (api, params) {
  const items = ref([]);
  const selectedIds = ref([]);
  const isLoading = ref(false);
  const isLoadingError = ref(false);

  const selectItem = ($event, id) => {
    const isChecked = $event.target.checked;
    if (isChecked) {
      selectedIds.value.push(id);
    } else {
      selectedIds.value = without(selectedIds.value, id);
    }
    return selectedIds.value;
  };

  const loadItems = () => {
    isLoading.value = true;
    isLoadingError.value = false;

    setTimeout(async () => {
      try {
        const response = await axios.get(API_BASE_URL + api, params);
        items.value = response.data;

        isLoading.value = false;
      } catch (e) {
        isLoadingError.value = true;
        isLoading.value = false;
        console.log('error', e);
      }
    }, 0);
  };

  return {
    items,
    selectedIds,
    isLoading,
    isLoadingError,
    loadItems,
    selectItem,
  };
}
