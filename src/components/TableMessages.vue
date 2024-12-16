<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const messagesForOwner = ref([]);
const headerTableTitles = ref([])


function getSaleProducts() {
    axios.get(`${import.meta.env.VITE_SERVER}/messages/messages-for-owner`)
        .then(response => {
            console.log(response.data.data);
            if (response.data) {
                headerTableTitles.value = Object.keys(response.data.data[0]);

                messagesForOwner.value = response.data.data;

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
        <table v-if="headerTableTitles.length > 0" class="table table-sm table-bordered border-primary caption-top">
            <caption>Products in offer</caption>
            <thead class="table-primary ">
                <tr>
                    <!-- Genera i titoli delle colonne -->
                    <th v-for="title in headerTableTitles" :key="title"
                        :class="(title === 'img' || title === 'description') ? 'd-none d-md-table-cell' : ''"
                        scope="col">
                        {{ title }}
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider border-primary">
                <tr v-for="message in messagesForOwner">
                    <th scope="row">{{ message.name }}</th>
                    <td class=" text-wrap">{{ message.email }}</td>
                    <td>{{ message.message }} %</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <h1 class="text-center pt-4"> 404 Data</h1>
        </div>
    </div>
</template>


<style scoped>
th {
    text-transform: uppercase;
    font-weight: bold;
}
</style>