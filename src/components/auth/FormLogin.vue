<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import Allert from '../Allert.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginData = reactive({
    email: "",
    password: ""
});

const error = reactive({
    errorEmail: "",
    errorPassword: ""
})

const alertStatus = ref("");
const alertText = ref("");

function setAllert(status, text) {
    console.log(status, text);
    alertStatus.value = status
    alertText.value = text
}


function validationEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

async function handlerLogin() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/auth/login`, { data: loginData }, { withCredentials: true });

        if (response.status === 200) {
            setAllert("success", "Registrazione avvenuta con successo");
            setTimeout(() => {
                router.push('/private')
            }, 3000);
        }

    } catch (error) {
        setAllert("danger", "Qualcosa è andato storto riprova");
        setTimeout(() => {
            setAllert("", "");
        }, 3000);
        console.error('An error occurred:', error);
    }
}

function handlerForm(e) {
    e.preventDefault();

    const data = loginData

    const validatedEmail = validationEmail(data.email);

    if (!validatedEmail) {
        error.errorEmail = 'email non valida'
        return;
    } else {
        error.errorEmail = ""
    }

    if (!data.password) {
        error.errorPassword = 'password mancante'
        return;
    } else {
        error.errorPassword = ""
    }

    handlerLogin();
}
</script>

<template>
    <Allert :isVisible="alertStatus.length > 0" :status="alertStatus" :text="alertText" />
    <section class="bg-light py-3 py-md-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div class="card border border-light-subtle rounded-3 shadow-sm">
                        <div class="card-body p-3 p-md-4 p-xl-5">
                            <div class="text-center mb-3">
                                <a href="#!">
                                    <img src="/logo_dark_400x400.png" alt="BootstrapBrain Logo" width="100" height="100"
                                        class="object-fit-cover rounded">
                                </a>
                            </div>
                            <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                            <form @submit="handlerForm">
                                <div class="row gy-2 overflow-hidden">
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="email"
                                                placeholder="name@example.com" autocomplete="current-email"
                                                v-model="loginData.email" required>
                                            <label for="email" class="form-label">Email</label>
                                            <div v-if="error.errorEmail" class="text-danger">{{ error.errorEmail }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="password"
                                                placeholder="Password" autocomplete="current-password"
                                                v-model="loginData.password" required>
                                            <label for="password" class="form-label">Password</label>
                                            <div v-if="error.errorPassword" class="text-danger">{{ error.errorPassword
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid my-3">
                                            <button class="btn btn-primary btn-lg" type="submit">Log in</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
