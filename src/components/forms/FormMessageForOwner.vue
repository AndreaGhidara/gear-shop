<script setup>
import axios from 'axios';
import { computed, reactive, ref } from 'vue';
import Allert from '../Allert.vue';

const messageForAdmin = reactive({
    name: "",
    email: "",
    message: ""
});

const errors = reactive({
    name: '',
    email: '',
    message: ''
});

const isFormInvalid = computed(() => {
    return !messageForAdmin.name ||
        !messageForAdmin.email ||
        !messageForAdmin.message ||
        messageForAdmin.message.length < 4
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


async function sendMessage(data) {

    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/messages/message-for-owner`, data);

        if (response.status === 200) {
            setAlert("success", response.data.message);
            clearAllert();
        }

        resetForm();
    } catch (error) {
        setAlert("danger", "Errore del server");
        console.error(error);
    }

}

function checkValidMail(email) {
    return email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageForAdmin.email)
}

function validateForm() {

    if (!messageForAdmin.name) {
        errors.name = "Il nome è obbligatorio"
        return;
    } else {
        errors.name = ""
    }

    const isValidMail = checkValidMail(messageForAdmin.email)

    if (!isValidMail) {
        errors.email = "Inserire un' email valida";
        return;
    } else {
        errors.email = "";
    }

    if (messageForAdmin.message.length < 4) {
        errors.message = "Il messaggio deve essere più lungo di 4 caratteri"
        return;
    } else {
        errors.message = ""
    }
    // STESSA COSA DI SOPRA, MA FATTA CON L'OPERATORE TERNARIO 
    // errors.name = messageForAdmin.name ? "" : "Il nome è obbligatorio";
    // errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageForAdmin.email)
    //     ? ""
    //     : "Inserire un' email valida";
    // errors.message = messageForAdmin.message.length >= 4
    //     ? ""
    //     : "Il messaggio deve essere più lungo di 4 caratteri";
}

function sendMessageForAdmin(e) {
    e.preventDefault();
    validateForm();

    // Eseguo solo se non ci sono errori
    if (!errors.name && !errors.email && !errors.message) {
        sendMessage(messageForAdmin);
    }
}

function resetForm() {
    messageForAdmin.name = "";
    messageForAdmin.email = "";
    messageForAdmin.message = "";
    errors.name = "";
    errors.email = "";
    errors.message = "";
    // METODO VELOCE PER RESETTARE GLI ERRORI
    // Object.keys(errors).forEach(key => errors[key] = '');
}
</script>

<template>
    <!-- FORM 1
        Messaggio per il proprietario del sito
        Nome -> required
        Email -> required
        Messaggio -> required -->
    <Allert :isVisible="alertState.length > 0" :status="alertState" :text="alertText" />
    <div class="container border-bottom pb-3">
        <h2 class="text-uppercase fw-semibold fs-4">Messaggio per il proprietario del sito</h2>
        <div class="row d-flex flex-column">
            <form @submit="sendMessageForAdmin">
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="name" class="form-label">Name</label>
                            <div id="nameHelp" class="form-text">Required</div>
                        </div>
                        <input v-model="messageForAdmin.name" type="text" class="form-control"
                            :class="{ 'is-invalid': errors.name }" id="name" aria-describedby="nameHelp">
                        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between">
                            <label for="email" class="form-label">Email</label>
                            <div id="emailHelp" class="form-text">Required</div>
                        </div>
                        <input v-model="messageForAdmin.email" type="email" class="form-control"
                            :class="{ 'is-invalid': errors.email }" id="email" aria-describedby="emailHelp">
                        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <div id="messageHelp" class="form-text text-end">Required</div>
                        <div class="form-floating">
                            <textarea v-model="messageForAdmin.message" class="form-control"
                                :class="{ 'is-invalid': errors.message }" id="message"
                                aria-describedby="messageHelp"></textarea>
                            <label for="message">Message</label>
                        </div>
                        <div v-if="errors.message" class="text-danger">{{ errors.message }}</div>
                    </div>
                </div>
                <button :disabled="isFormInvalid" type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>


<style scoped></style>