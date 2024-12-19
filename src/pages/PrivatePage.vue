<script setup>
import { onMounted, ref } from 'vue';
import TableMessages from '../components/TableMessages.vue';
import TableProducts from '../components/TableProducts.vue';
import axios from 'axios';

const isAuthenticated = ref(false)

async function verifyUser() {

    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/auth/verifyToken`, { withCredentials: true })

        if (response.status === 200) {
            isAuthenticated.value = true
        }


    } catch (error) {
        console.error(error)
    }


}

onMounted(() => {
    console.log('monto');
    verifyUser()


})

</script>

<template>
    <div v-if="isAuthenticated" class="container">
        <div class="row d-flex flex-column ">
            <div class="col">
                <TableProducts />
            </div>
            <div class="col">
                <TableMessages />
            </div>
        </div>
    </div>
    <div v-else class="container-fluid d-flex justify-content-center align-items-center py-5 vw-100" style="height: 78vh;">
        <div class="row">
            <div class="col">
                <a href="/login">
                    <button class="btn btn-dark">
                        Go To Login
                    </button>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>