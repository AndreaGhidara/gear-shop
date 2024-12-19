<script setup>
import Card from './Card.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const productsOnSale = ref([]);


function getSaleProducts() {
    //import.meta.env | serve per prendere i dati dall' .env
    axios.get(`${import.meta.env.VITE_SERVER}/products/product-on-sale`)
        .then(response => {
            console.log(response.data.data);
            if (response.data) {

                productsOnSale.value = response.data.data;
            }

        })
        .catch(error => {
            console.error(error);
        })
}

onMounted(() => {
    getSaleProducts()
});

</script>

<template>
    <div class="container">
        <h1 class="text-center text-uppercase">Offers</h1>
        <div v-if="productsOnSale && productsOnSale.length > 0" class="row d-flex flex-wrap gap-2">
            <div v-for="product in productsOnSale" :key="product.id" class="col">
                <Card :title="product.name" :description="product.description" :price="Number(product.price)"
                    :discount="product.discount" :img="product.img" />
            </div>
        </div>
        <div v-else class="row d-flex flex-wrap gap-2">
            <p class="text-center">No products on Sale</p>
        </div>
    </div>
</template>
