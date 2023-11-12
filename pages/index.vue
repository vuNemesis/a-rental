<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center">
      <p class="text-h4">Заказы</p>

      <div class="row">
        <q-btn flat color="secondary" icon="refresh" @click="reloadOrders()" />
        <q-btn
          class="q-ml-sm"
          color="primary"
          label="Новый заказ"
          @click="orderCreateDialogShown = true"
        />
      </div>
    </div>

    <order-list :orders="orders" :loading="loadingOrders" v-if="!ordersError" />
    <div v-else>
      {{ ORDERS_LOAD_ERROR }}
    </div>

    <order-create-dialog
      :visible="orderCreateDialogShown"
      @close="orderCreateDialogShown = false"
      @create="createOrder"
    />
  </div>
</template>

<script setup lang="ts">
import type { Order, OrderWithoutId } from "~/types/models";
import { useQuasar } from "quasar";

const $q = useQuasar();

const API_ORDERS_URL = "/api/orders";

const ORDERS_LOAD_ERROR =
  "Не удалось получить Заказы. Пожалуйста, попробуйте позднее!";
const {
  data,
  refresh: reloadOrders,
  pending: loadingOrders,
  error: ordersError,
} = await useFetch<{ orders: Order[] }>(API_ORDERS_URL);

const orders = computed<Order[]>(() => data.value?.orders || []);

const orderCreateDialogShown = ref(false);

const createOrder = async (order: OrderWithoutId, done: CallableFunction) => {
  try {
    const response = await $fetch(API_ORDERS_URL, {
      method: "POST",
      body: order,
    });

    done(true);
    $q.notify({ message: "Создан новый заказ", position: "top" });

    reloadOrders();
  } catch (e) {
    console.error(e);
    done(false);
  }
};
</script>
