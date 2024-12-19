<script setup>
import ReviewsComponent from '../ReviewsComponent.vue'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import Allert from '../Allert.vue';

const reviews = ref([]);

const siteReview = reactive({
    name: "",
    rating: null,
    comment: ""
});

const reviewErrors = reactive({
    rating: ''
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


function resetReviewForm() {
    siteReview.name = "";
    siteReview.rating = null;
    siteReview.comment = "";
    reviewErrors.rating = ""
}

function resetNotify() {
    alertState.value = "";
    alertText.value = ""
}

function validateReviewForm() {
    reviewErrors.rating = !siteReview.rating || siteReview.rating < 1 || siteReview.rating > 5
        ? 'Il voto deve essere tra 1 e 5'
        : '';
}

function getReview() {
    axios.get(`${import.meta.env.VITE_SERVER}/reviews`)
        .then(response => {
            console.log(response.data);
            if (response.data) {
                reviews.value = response.data.data
            }
        })
        .catch(error => {
            console.error(error);
        })
}


async function sendReview(data) {

    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/reviews`, data)

        if (response.status === 200) {
            setAlert("success", response.data.message);
            clearAllert()
            getReview();
        }

        resetReviewForm();
    } catch (error) {
        setAlert("danger", "Errore del server");
        console.error(error);
    }

}

function handlerSendReview(e) {
    // Evita il re-rendering della pagina
    e.preventDefault();
    // Reset Notifiche
    resetNotify()
    //controllo se è stata messa la valutazione
    validateReviewForm();
    //se non ci sono errori procedo
    if (!reviewErrors.rating) {

        if (siteReview.name.length >= 0) {
            siteReview.name = "Utente Anonimo"
        }

        sendReview(siteReview);
    }
}

onMounted(() => {
    getReview()
})


</script>

<template>
    <!-- FORM 2
        Recensione del sito
        nome -> NO required | se manca mettere "Utente Anonimo"
        voto da 1 a 5 -> required
        testo -> No required -->
    <Allert :isVisible="alertState.length > 0" :status="alertState" :text="alertText" />
    <div class="container border-bottom pb-3 pt-3">
        <h2 class="text-uppercase fw-semibold fs-4">Recensione del sito</h2>
        <div class="row">
            <form @submit="handlerSendReview">
                <div class="col">
                    <div class="mb-3">
                        <label for="reviewName" class="form-label">Nome</label>
                        <input v-model="siteReview.name" type="text" class="form-control" id="reviewName">
                        <div id="nameHelp" class="form-text">Lascia vuoto per "Utente Anonimo"</div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating mb-3">
                        <textarea v-model="siteReview.comment" class="form-control" id="reviewComment"
                            placeholder="Leave a comment here"></textarea>
                        <label for="reviewComment">Message</label>
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <label for="reviewRating" class="form-label">Voto (1-5)</label>
                        <select v-model="siteReview.rating" class="form-select"
                            :class="{ 'is-invalid': reviewErrors.rating }" id="reviewRating">
                            <option disabled value="">Seleziona un voto</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div v-if="reviewErrors.rating" class="text-danger">{{ reviewErrors.rating }}</div>
                    </div>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <section class="container mx-auto border-bottom pt-3 pb-3">
        <ReviewsComponent :reviews="reviews" />
    </section>
</template>


<style scoped></style>