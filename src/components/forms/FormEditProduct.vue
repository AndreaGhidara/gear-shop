<script setup>
import axios from 'axios';
import { computed, onMounted, reactive } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true,
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

const editProduct = reactive({
    name: "",
    description: "",
    img: "",
    price: 0,
    discount: 0
});

const errors = reactive({
    name: "",
    description: "",
    img: "",
    price: "",
    discount: ""
});

const isFormInvalid = computed(() => {
    return !editProduct.name ||
        !editProduct.description ||
        !editProduct.price
});

function validateForm() {

    if (!editProduct.name) {
        errors.name = "Il nome è obbligatorio"
    } else {
        errors.name = ""
    }

    if (!editProduct.description) {
        errors.description = "La descrizione è obbligatoria"
    } else {
        errors.description = ""
    }

    if (!editProduct.price) {
        errors.price = "Il prezzo è obbligatorio"
    } else if (isNaN(Number(editProduct.price))) {
        errors.price = "Il prezzo deve essere come indicato nell' esempio, non deve contenere lettere"
    } else {
        errors.price = ""
    }

    if (editProduct.discount > 100 || editProduct.discount < 0) {
        errors.discount = "Lo sconto puo essere al massimo del 100%"
    } else {
        errors.discount = ""
    }

}

function resetForm() {
    editProduct.name = "";
    editProduct.description = "";
    editProduct.img = "";
    editProduct.price = "";
    editProduct.discount = 0;
    editProduct.message = "";
}

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

function sendeditProduct(e) {
    e.preventDefault();
    console.log(editProduct);
    validateForm();

    if (!errors.name && !errors.description && !errors.img && !errors.discount && !errors.price) {
        sendproduct(editProduct)
    }

    // editProduct.price = (editProduct.price).toFixed(2)
}

function setProduct(product){
    editProduct.name = product.name;
    editProduct.description = product.description;
    editProduct.img = product.img;
    editProduct.price = product.price;
    editProduct.discount = product.discount

}

onMounted(() => {
    setProduct(props.product);
});

</script>

<template>
    <div class="container border-bottom pb-3">
        <div class="row d-flex flex-column">
            <form @submit="sendeditProduct">
                <!-- NOME -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="name" class="form-label">Name Product</label>
                            <div id="nameHelp" class="form-text">Required</div>
                        </div>
                        <input v-model="editProduct.name" type="text" class="form-control"
                            :class="{ 'is-invalid': errors.name }" id="name" aria-describedby="nameHelp">
                        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
                    </div>
                </div>
                <!-- IMG -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="img" class="form-label">Img</label>
                            <div id="imgHelp" class="form-text">Not Required</div>
                        </div>
                        <input v-model="editProduct.img" type="text" class="form-control"
                            :class="{ 'is-invalid': errors.img }" id="img" aria-describedby="imgHelp">
                        <div v-if="errors.img" class="text-danger">{{ errors.img }}</div>
                    </div>
                </div>
                <!-- DESCRIPTION -->
                <div class="col">
                    <div class="mb-3">
                        <div id="descriptionHelp" class="form-text text-end">Required</div>
                        <div class="form-floating">
                            <textarea v-model="editProduct.description" class="form-control"
                                :class="{ 'is-invalid': errors.description }" id="description"
                                aria-describedby="descriptionHelp"></textarea>
                            <label for="description">Description</label>
                        </div>
                        <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
                    </div>
                </div>
                <!-- PRICE -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="price" class="form-label">Price</label>
                            <div id="priceHelp" class="form-text">Required</div>
                        </div>
                        <input v-model="editProduct.price" type="text" class="form-control"
                            :class="{ 'is-invalid': errors.price }" id="price" aria-describedby="priceHelp">
                        <div id="emailHelp" class="form-text">Inserire il valore come in esemio "50.49 || 150.99" .
                        </div>
                        <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
                    </div>
                </div>
                <!-- DISCOUNT -->
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="discount" class="form-label">Discount</label>
                            <div id="discountHelp" class="form-text">Not Required</div>
                        </div>
                        <input v-model="editProduct.discount" min="0" max="100" type="number" class="form-control"
                            :class="{ 'is-invalid': errors.discount }" id="discount" aria-describedby="discountHelp">

                        <div v-if="errors.discount" class="text-danger">{{ errors.discount }}</div>
                    </div>
                </div>
                <!-- BOTTONI -->
                <!-- <button :disabled="isFormInvalid" type="submit" class="btn btn-primary">Submit</button> -->
                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>
    </div>
</template>


<style scoped></style>