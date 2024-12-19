<script setup>
import Allert from './Allert.vue'
import FormEditProduct from './forms/FormEditProduct.vue'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import Modal from './Modal.vue';
import FormNewProduct from './forms/FormNewProduct.vue';
import validateDataProductForm from '../utils/products/validateDataProduct';
import OffCanvas from './OffCanvas.vue';

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

const newProduct = reactive({
    name: "",
    description: "",
    img: "",
    price: 0,
    discount: 0
})

const errors = reactive({
    name: "",
    description: "",
    img: "",
    price: "",
    discount: ""
});

const alertState = ref("");
const alertText = ref("");

function setAlert(state, message) {
    alertState.value = state;
    alertText.value = message;
}

function clearAllert() {
    setTimeout(() => {
        setAlert("", "")
    }, 5000);
}


function resetForm(product) {

    product.name = "";
    product.description = "";
    product.img = "";
    product.price = "";
    product.discount = 0;
    product.message = "";
}

function resetError() {
    errors.name = "";
    errors.description = "";
    errors.price = "";
    errors.discount = 0;
    errors.message = "";
}

function clearError() {
    setTimeout(() => {
        resetError()
    }, 5000);
}

// Prende i prodotti
async function getSaleProducts() {

    try {

        const response = await axios.get(`${import.meta.env.VITE_SERVER}/products/product-on-sale`)

        const products = response.data.data

        if (response.data && products) {
            headerTableTitles.value = Object.keys(products[0]);
            headerTableTitles.value.push("action");
            productsOnSale.value = products;
        }

    } catch (error) {
        console.error(error);
        setAlert('danger', 'errore del server')
        clearAllert();
    }

}

// Cancella il prodotto
async function deleted(id) {

    if (!id) {
        return;
    }

    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER}/products/delate/${id}`, { withCredentials: true })

        if (response.status === 200) {
            setAlert("warning", response.data.message);
            clearAllert();
            getSaleProducts();
        }

    } catch (error) {
        setAlert('danger', 'errore del server')
        clearAllert();
        console.error(error);
    }

}

//Aggiungi prodotto
async function addproduct(data, errors) {

    if (!data) {
        setAlert("danger", "nessun dato");
        clearAllert();
        return;
    }

    await validateDataProductForm(data, errors);


    //Se non ci sono errori
    if (!errors.name && !errors.description && !errors.img && !errors.discount && !errors.price) {

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/products/addProduct`, data, { withCredentials: true })
            if (response.status === 200) {
                setAlert("success", response.data.message);
                clearAllert();
                getSaleProducts();
                resetForm(newProduct);
            }
        } catch (error) {
            console.error(error);
            setAlert("danger", "Errore del server");
            clearAllert();
        }
    }

    clearAllert()

}

async function editProduct(data) {

    if (!data) {
        alert('nessun data');
        clearAllert();
        return;
    }

    await validateDataProductForm(data, errors);
    clearError();


    if (!errors.name && !errors.description && !errors.img && !errors.discount && !errors.price) {

        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/products/editProduct/${data.id}`, data, { withCredentials: true })
            if (response.status === 200) {
                setAlert("success", response.data.message);
                getSaleProducts();
                clearAllert();
            }
        } catch (error) {
            console.error(error);
            setAlert("danger", "Errore del server");
            clearAllert();
        }
    }

}

function createCopyDataToEdit(data) {
    product.name = data.name;
    product.description = data.description;
    product.img = data.img;
    product.price = data.price;
    product.discount = data.discount;
    product.id = data.id
}

onMounted(() => {
    getSaleProducts()
});

</script>

<template>
    <div>
        <Allert :isVisible="alertState.length > 0" :status="alertState" :text="alertText" />
        <table v-if="headerTableTitles.length > 0" class="table table-sm table-bordered  caption-top">
            <caption class=" justify-content-between">
                Products in offer
                <OffCanvas id="addProduct" title="Form add Product">
                    <template #trigger>
                        <button class="btn text-white p-0">+</button>
                    </template>
                    <FormNewProduct :productData="newProduct" :errorData="errors" :callback="getSaleProducts" />
                    <button type="button" class="btn btn-success " @click="addproduct(newProduct, errors)">
                        Save
                    </button>
                </Offcanvas>
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
                <tr v-for="prod in productsOnSale">
                    <th scope="row">{{ prod.id }}</th>
                    <td class="">{{ prod.name }}</td>
                    <td class="d-none d-md-table-cell">{{ prod.description }}</td>
                    <td class="d-none d-md-table-cell">{{ prod.img || "No img" }}</td>
                    <td>{{ prod.price }}</td>
                    <td class="d-none d-md-table-cell">{{ prod.discount }} %</td>
                    <td @click="createCopyDataToEdit(prod)" class="d-flex justify-content-center">
                        <Modal :id="`${prod.name.replace(/\s+/g, '').trim()}${prod.id}`" :title="prod.name">
                            <template #body>
                                <div v-if="!editMode">
                                    <small>
                                        <span class="fw-semibold">Discount</span> : {{ prod.discount ||
                                            "no_discount" }} %
                                    </small>
                                    <p>
                                        <span class="fw-semibold">Price</span>
                                        {{ prod.price }}€
                                    </p>
                                    <p class="m-0 fw-semibold">description:</p>
                                    <div class="border p-2">
                                        <p>{{ prod.description || "N/A" }}</p>
                                    </div>
                                </div>
                                <!-- EDIT PRODUCT -->
                                <div v-else>
                                    <FormEditProduct :errorData="errors" :productData="product" />
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
                                <button v-if="editMode" type="button" class="btn btn-success text-white"
                                    @click="editProduct(product)">
                                    save
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