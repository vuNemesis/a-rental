<template>
  <q-markup-table class="q-mt-md">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Статус</th>
        <th class="text-left">Комментарий</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td class="text-left">{{ order.id }}</td>
        <td class="text-left">
          <q-badge
            :color="order.status.id === 1 ? 'primary' : 'secondary'"
            outline
            text-color="black"
            :label="order.status.title"
          />
        </td>
        <td class="text-left">{{ order.comment }}</td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-inner-loading :showing="loading"></q-inner-loading>
</template>

<script setup lang="ts">
import type { Order } from "~/types/models";

interface Props {
  orders: Order[];
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  orders: () => [],
  loading: false,
});
</script>

<style scoped></style>
