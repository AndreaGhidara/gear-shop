<script setup>
import axios from 'axios';
import { reactive, computed } from 'vue';

const siteReview = reactive({
    name: "",
    rating: null,
    comment: ""
});

const reviewErrors = reactive({
    rating: ''
});

function sendReview(data) {
    const server = 'http://localhost:3000'

    axios.post(`${server}/review-for-site`, data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        })
}

// Controllo se è stata aggiunta la valutazione al sito, se non è stata data, creo un errore
function validateReviewForm() {
    reviewErrors.rating = siteReview.rating ? '' : 'Il voto è obbligatorio';
}

function submitSiteReview(e) {
    // Evita il re-rendering della pagina
    e.preventDefault();
    //controllo se è stata messa la valutazione
    validateReviewForm();

    //se non ci sono errori procedo
    if (!reviewErrors.rating) {
        console.log(siteReview.name);

        if (siteReview.name.length >= 0) {
            siteReview.name = "Utente Anonimo"
        }


        sendReview(siteReview)
        alert("Recensione inviata con successo!");
        resetReviewForm();
    }
}

function resetReviewForm() {
    siteReview.name = "";
    siteReview.rating = null;
    siteReview.comment = "";
    reviewErrors.rating = ""
}
</script>

<template>
    <!-- FORM 2
        Recensione del sito
        nome -> NO required | se manca mettere "Utente Anonimo"
        voto da 1 a 5 -> required
        testo -> No required -->
    <div class="container border-bottom pb-3 pt-3">
        <h2 class="text-uppercase fw-semibold fs-4">Recensione del sito</h2>
        <div class="row">
            <form @submit="submitSiteReview">
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
</template>


<style scoped></style>