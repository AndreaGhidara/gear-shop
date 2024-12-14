<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const productsOnSale = ref([]);
const headerTableTitle = ref([])


function getSaleProducts() {
    axios.get(`${import.meta.env.VITE_SERVER}/products/product-on-sale`)
        .then(response => {
            console.log(response.data.data);
            if (response.data) {
                // headerTableTitle.value = Object.keys(response.data.data[0])

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
    <div>
        <table v-if="headerTableTitle.length > 0" class="table table-bordered border-primary caption-top">
            <caption>Products in offer</caption>
            <thead class="table-primary">
                <tr>
                    <th v-for="title in headerTableTitle" scope="col">{{ title }}</th>
                </tr>
            </thead>
            <tbody class="table-group-divider border-primary">
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <h1 class="text-center pt-4" > 404 Data</h1>
        </div>
    </div>
</template>


<style scoped>
th {
    text-transform: uppercase;
    font-weight: bold;
}
</style>