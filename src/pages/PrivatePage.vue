<script setup>
import TableMessages from '../components/TableMessages.vue';
import TableProducts from '../components/TableProducts.vue';


</script>

<template>
    <div class="container">
        <div class="row d-flex flex-column ">
            <div class="col">
                <TableProducts />
            </div>
            <div class="col">
                <TableMessages />
            </div>
        </div>
    </div>
</template>

<style scoped></style>