<script setup>
import Carousel from '../components/Carosel.vue';
import Hero from '../components/Hero.vue';
import ProductsInOffer from '../components/ProductsInOffer.vue';

</script>

<template>
    <main>
        <section>
            <Carousel />
        </section>
        <section id="story">
            <Hero />
        </section>
        <section id="info">
            <div class="container border-top border-bottom my-5">
                <div class="row py-5">
                    <div class="col-md-7 order-md-2 d-flex flex-column justify-content-center">
                        <h2 class="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span
                                class="text-body-secondary">See
                                for yourself.</span></h2>
                        <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea
                            of how this
                            layout would work with some actual real-world content in place.</p>
                    </div>
                    <div class="col-md-5 order-md-1">
                        <img src="/walpaper_carousel_2.jpg" height="500" class="w-100 object-fit-cover" alt="">
                    </div>
                </div>
            </div>
        </section>
        <section id="products">
            <ProductsInOffer />
        </section>
    </main>
</template>

<style scoped>

</style>