<script setup>
import { RouterLink } from 'vue-router';



</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
        <div class="container-fluid overflow-hidden">
            <div class="d-flex align-items-center justify-content-center">
                <img class="d-block mx-auto" src="/logo_icon_dark.png" alt="" width="50" height="50">
                <a class="navbar-brand" href="#">Military Gear</a>
            </div>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse" id="navbarsExample04">
                <ul class="navbar-nav me-auto mb-2 mb-md-0 gap-3">
                    <li class="nav-item ">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/contact-and-review">Contact and Review</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/private">Private</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>