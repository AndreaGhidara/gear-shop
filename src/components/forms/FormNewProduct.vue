<script setup>
import axios from 'axios';
import { computed, reactive } from 'vue';
import validateDataProductForm from '../../utils/products/validateDataProduct';

const props = defineProps({
    productData: {
        type: Object,
        required: true, // La funzione è opzionale
    },
    errorData: {
        type: Object,
        required: true, // La funzione è opzionale
    },
    callback: {
        type: Function,
        required: false, // La funzione è opzionale
    },
});

function handleAction() {
    if (props.callback) {
        // Chiama la funzione passata come prop, se è definita
        props.callback();
    } else {
        console.warn("No callback provided");
    }
}

// const productData = reactive({
//     name: "",
//     description: "",
//     img: "",
//     price: 0,
//     discount: 0
// });

// const errorData = reactive({
//     name: "",
//     description: "",
//     img: "",
//     price: "",
//     discount: ""
// });

// const isFormInvalid = computed(() => {
//     return !productData.name ||
//         !productData.description ||
//         !productData.price
// });

// function resetForm() {
//     productData.name = "";
//     productData.description = "";
//     productData.img = "";
//     productData.price = "";
//     productData.discount = 0;
//     productData.message = "";
// }

function sendproduct(data) {
    axios.post(`${import.meta.env.VITE_SERVER}/products/addProduct`, data)
        .then(response => {
            console.log(response.data);
            alert("Messaggio inviato con successo!");
            handleAction();
            resetForm();
        })
        .catch(error => {
            console.error(error);
            alert("Errore con il server");
        })
}

function sendproductData(e) {
    e.preventDefault();
    console.log(productData, errorData);
    const validation = validateDataProductForm(productData, errorData);
    console.log(validation);

    // validateForm();

    // if (!errorData.name && !errorData.description && !errorData.img && !errorData.discount && !errorData.price) {
    //     sendproduct(productData)
    // }

    // productData.price = (productData.price).toFixed(2)

}


</script>

<template>
    <!-- "id": 0,
        "name": "Bussola Militare",
        "description": "Una bussola robusta adatta per attività all'aperto.",
        "img": "",
        "price": 10.19,
        "discount": 0 -->
    <div class="container border-bottom pb-3">
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