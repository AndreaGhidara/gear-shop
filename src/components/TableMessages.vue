<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Modal from './Modal.vue';
import Allert from './Allert.vue';


const messagesForOwner = ref([]);
const headerTableTitles = ref([])

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

async function getMessagesForOwner() {

    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/messages/messages-for-owner`);

        if (response.status !== 200) {
            console.log('errore status');
            return;
        }

        const messages = response.data.data;
        headerTableTitles.value = Object.keys(messages[0]);
        headerTableTitles.value.push("action");
        messagesForOwner.value = messages;

    } catch (error) {
        console.error(error);
        setAlert("danger", "Errore con il server")

    }

}

function stateOfMessage(status) {
    switch (status) {
        case "new":
            return "table-warning";
        case "working":
            return "table-success";
        case "end":
            return "table-secondary";
        default:
            return "";
    }
}

async function setStatus(id, newStatus, oldStaus) {
    // console.log(id, newStatus, oldStaus);

    // Se il veccio stato è uguale al nuovo stato, evito di fare la chiamata;
    if (newStatus === oldStaus) {
        return;
    }

    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER}/messages/edit/${id}`, { data: newStatus })

        if (response.status === 200) {
            getMessagesForOwner()
        }

    } catch (error) {
        console.error(error);
        setAlert("danger", "Errore con il server")

    }

}

onMounted(() => {
    getMessagesForOwner()
});

</script>

<template>
    <Allert :isVisible="alertState.length > 0" :status="alertState" :text="alertText" />
    <div>
        <table v-if="headerTableTitles.length > 0" class="table table-sm table-bordered border-primary caption-top">
            <caption>Messages for owner</caption>
            <thead class="table-primary ">
                <tr>
                    <!-- Genera i titoli delle colonne -->
                    <th v-for="title in headerTableTitles" :key="title"
                        :class="(title === 'email' || title === 'message' || title === 'id') ? 'd-none d-md-table-cell' : ''"
                        scope="col">
                        {{ title }}
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider border-primary">
                <tr v-for="message, i in messagesForOwner" :class="stateOfMessage(message.status)" :key="message.name">
                    <th scope="row">{{ message.name }}</th>
                    <td class=" text-wrap d-none d-md-table-cell">{{ message.email }}</td>
                    <td class="d-none d-md-table-cell">{{ message.message }}</td>
                    <td class="d-none d-md-table-cell">{{ message.id }}</td>
                    <td class="">{{ message.status }}</td>
                    <td>
                        <Modal :id="`${message.name.replace(/\s+/g, '').trim()}${i}`" :title="message.name">
                            <template #body>
                                <small> <span class="fw-semibold">email</span> : {{ message.email || "no mail" }}
                                </small>
                                <p class="m-0 fw-semibold">message </p>
                                <div class="border p-2">
                                    <p>{{ message.message }}</p>
                                </div>
                                {{ message.status || "no status" }}
                            </template>
                            <template #footer>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                                    @click="setStatus(message.id, 'working', message.status)">Set
                                    Woking</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                    @click="setStatus(message.id, 'end', message.status)">Set
                                    End</button>
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