<template>
  <q-dialog :model-value="visible" @hide="emit('close')">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-teal">Новый заказ</div>

        <q-form @submit="onSubmit" @reset="onReset" class="q-mt-md q-gutter-md">
          <q-select
            outlined
            v-model="order.status"
            :options="statuses"
            option-value="id"
            option-label="title"
            emit-value
            map-options
            label="Статус"
          />

          <q-input
            outlined
            v-model="order.comment"
            label="Комментарий"
            lazy-rules
            type="textarea"
            autofocus
            :rules="[(val) => (val && val.length > 0) || 'Введите комментарий']"
          />

          <div class="row justify-end">
            <q-btn
              label="Сброс"
              type="reset"
              color="primary"
              flat
              :disable="loading"
            />
            <q-btn
              class="q-ml-sm"
              label="Создать"
              type="submit"
              color="primary"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { OrderStatus, OrderWithoutId } from "~/types/models";
import { statuses } from "~/models/order";

interface Props {
  visible: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
});

const emit = defineEmits<{
  close: [];
  create: [order: OrderWithoutId, done: CallableFunction];
}>();

const loading = ref(false);

const defaultOrder: OrderWithoutId = {
  status: statuses[0],
  comment: "",
};

const order = ref<OrderWithoutId>({ ...defaultOrder });

const onSubmit = () => {
  const done = (created: boolean) => {
    loading.value = false;

    if (created) {
      onReset();
      emit("close");
    }
  };

  loading.value = true;

  emit("create", order.value, done);
};

const onReset = () => {
  order.value = { ...defaultOrder };
};
</script>
