<script setup>

const props = defineProps({
    productData: {
        type: Object,
        required: true, // La funzione è opzionale
    },
    errorData: {
        type: Object,
        required: true, // La funzione è opzionale
    },
});

</script>

<template>
    <!-- "id": 0,
        "name": "Bussola Militare",
        "description": "Una bussola robusta adatta per attività all'aperto.",
        "img": "",
        "price": 10.19,
        "discount": 0 -->
    <div class="container pb-3">
        <div class="row d-flex flex-column">
            <form>
                <!-- NOME -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="name" class="form-label">Name Product</label>
                            <div id="nameHelp" class="form-text">Required</div>
                        </div>
                        <input v-model="productData.name" type="text" class="form-control"
                            :class="{ 'is-invalid': errorData.name }" id="name" aria-describedby="nameHelp">
                        <div v-if="errorData.name" class="text-danger">{{ errorData.name }}</div>
                    </div>
                </div>
                <!-- IMG -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="img" class="form-label">Img</label>
                            <div id="imgHelp" class="form-text">Not Required</div>
                        </div>
                        <input v-model="productData.img" type="text" class="form-control"
                            :class="{ 'is-invalid': errorData.img }" id="img" aria-describedby="imgHelp">
                        <div v-if="errorData.img" class="text-danger">{{ errorData.img }}</div>
                    </div>
                </div>
                <!-- DESCRIPTION -->
                <div class="col">
                    <div class="mb-3">
                        <div id="descriptionHelp" class="form-text text-end">Required</div>
                        <div class="form-floating">
                            <textarea v-model="productData.description" class="form-control"
                                :class="{ 'is-invalid': errorData.description }" id="description"
                                aria-describedby="descriptionHelp"></textarea>
                            <label for="description">Description</label>
                        </div>
                        <div v-if="errorData.description" class="text-danger">{{ errorData.description }}</div>
                    </div>
                </div>
                <!-- PRICE -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="price" class="form-label">Price</label>
                            <div id="priceHelp" class="form-text">Required</div>
                        </div>
                        <input v-model="productData.price" type="text" class="form-control"
                            :class="{ 'is-invalid': errorData.price }" id="price" aria-describedby="priceHelp">
                        <div id="emailHelp" class="form-text">Inserire il valore come in esemio "50.49 || 150.99" .
                        </div>
                        <div v-if="errorData.price" class="text-danger">{{ errorData.price }}</div>
                    </div>
                </div>
                <!-- DISCOUNT -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="discount" class="form-label">Discount</label>
                            <div id="discountHelp" class="form-text">Not Required</div>
                        </div>
                        <input v-model="productData.discount" min="0" max="100" type="number" class="form-control"
                            :class="{ 'is-invalid': errorData.discount }" id="discount" aria-describedby="discountHelp">

                        <div v-if="errorData.discount" class="text-danger">{{ errorData.discount }}</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped></style>