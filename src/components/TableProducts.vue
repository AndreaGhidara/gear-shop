<script setup>
import FormEditProduct from './forms/FormEditProduct.vue'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import Modal from './Modal.vue';
import FormNewProduct from './forms/FormNewProduct.vue';
import validateDataProductForm from '../utils/products/validateDataProduct';

const productsOnSale = ref([]);
const headerTableTitles = ref([]);
const editMode = ref(false)

const product = reactive({
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

function resetForm() {
    product.name = "";
    product.description = "";
    product.img = "";
    product.price = "";
    product.discount = 0;
    product.message = "";
}

// Prende i prodotti
function getSaleProducts() {
    axios.get(`${import.meta.env.VITE_SERVER}/products/product-on-sale`)
        .then(response => {
            console.log(response.data.data);
            if (response.data) {
                headerTableTitles.value = Object.keys(response.data.data[0]);
                headerTableTitles.value.push("action");
                productsOnSale.value = response.data.data;
            }
        })
        .catch(error => {
            console.error(error);
        })
}

// Cancella il prodotto
function deleted(id) {
    if (!id) {
        return;
    }
    axios.delete(`${import.meta.env.VITE_SERVER}/products/delate/${id}`)
        .then(response => {
            if (response.status === 200) {
                getSaleProducts()
            }
        })
        .catch(error => {
            console.error(error);
        })
}

//Aggiungi prodotto
function addproduct(data) {

    if (!data) {
        alert('nessun data')
        return;
    }

    validateDataProductForm(data, errors);

    //Se non ci sono errori
    if (!errors.name && !errors.description && !errors.img && !errors.discount && !errors.price) {
        axios.post(`${import.meta.env.VITE_SERVER}/products/addProduct`, data)
            .then(response => {
                console.log(response.data);
                alert("Messaggio inviato con successo!");
                getSaleProducts();
                resetForm();
            })
            .catch(error => {
                console.error(error);
                alert("Errore con il server");
            })
    }


}

onMounted(() => {
    getSaleProducts()
});

</script>

<template>
    <div>
        <table v-if="headerTableTitles.length > 0" class="table table-sm table-bordered  caption-top">
            <caption class=" justify-content-between">
                Products in offer
                <Modal id="new-product" title="New Product" textOnButton="+">
                    <template #body>
                        <FormNewProduct :productData="product" :errorData="errors" :callback="getSaleProducts" />
                    </template>
                    <template #footer>
                        <button type="button" class="btn btn-success" @click="addproduct(product)">
                            Save
                        </button>
                    </template>
                </Modal>
            </caption>
            <thead class="table-primary ">
                <tr>
                    <!-- Genera i titoli delle colonne -->
                    <th v-for="title in headerTableTitles" :key="title"
                        :class="(title === 'img' || title === 'description' || title === 'discount') ? 'd-none d-md-table-cell' : ''"
                        scope="col">
                        {{ title }}
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider ">
                <tr v-for="product in productsOnSale">
                    <th scope="row">{{ product.id }}</th>
                    <td class="">{{ product.name }}</td>
                    <td class="d-none d-md-table-cell">{{ product.description }}</td>
                    <td class="d-none d-md-table-cell">{{ product.img || "No img" }}</td>
                    <td>{{ product.price }}</td>
                    <td class="d-none d-md-table-cell">{{ product.discount }} %</td>
                    <td class="d-flex justify-content-center">
                        <Modal :id="`${product.name.replace(/\s+/g, '').trim()}${product.id}`" :title="product.name">
                            <template #body>
                                <div v-if="!editMode">
                                    <small>
                                        <span class="fw-semibold">Discount</span> : {{ product.discount ||
                                            "no_discount" }} %
                                    </small>
                                    <p>
                                        <span class="fw-semibold">Price</span>
                                        {{ product.price }}€
                                    </p>
                                    <p class="m-0 fw-semibold">description:</p>
                                    <div class="border p-2">
                                        <p>{{ product.description || "N/A" }}</p>
                                    </div>
                                </div>
                                <div v-else>
                                    <FormEditProduct :product="product" />
                                </div>
                            </template>
                            <template #footer>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                    @click="deleted(product.id)">
                                    Delate
                                </button>
                                <button type="button" class="btn btn-info text-white"
                                    @click="() => editMode = !editMode">
                                    {{ editMode ? "info" : "edit" }}
                                </button>
                            </template>
                        </Modal>
                    </td>
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