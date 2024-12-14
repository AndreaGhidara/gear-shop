<script setup>
import FormMessageForOwner from '../components/forms/FormMessageForOwner.vue';
import FormSiteReview from '../components/forms/FormSiteReview.vue';
import ReviewsComponent from '../components/ReviewsComponent.vue';

</script>


<template>
    <h1 class="text-center fw-bold">CONTACT AND REVIEW</h1>
    <section>
        <FormMessageForOwner />
    </section>
    <section>
        <FormSiteReview />
    </section>
    <section class="container mx-auto border-bottom pt-3 pb-3">
        <ReviewsComponent />
    </section>
</template>

<style></style>