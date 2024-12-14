<script setup>


</script>

<template>
    <div id="myCarousel" class="carousel slide mb-6 pointer-event" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 1"
                aria-current="true"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"
                class=""></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"
                class=""></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item carousel-item-next carousel-item-start">
                <div class="w-100 h-100 position-absolute bg-black bg-opacity-50 " />
                <img src="/walpaper_carousel_1.jpg" class="w-100 h-100 object-fit-cover " alt="">
                <div class="container">
                    <div class="carousel-caption text-start">
                        <h1>Scopri la nostra storia.</h1>
                        <p class="opacity-75">
                            Scopri la storia di com'è nato il nostro shop
                        </p>
                        <p><a class="btn btn-lg btn-primary" href="#story">Story</a></p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="w-100 h-100 position-absolute bg-black bg-opacity-50 " />

                <img src="/walpaper_carousel_2.jpg" class="w-100 h-100 object-fit-cover " alt="">
                <div class="container">
                    <div class="carousel-caption">
                        <h1>Qualita dei Gear</h1>
                        <p>Scopri come e dove vengono fabbricati e testati i nostri prodotti.</p>
                        <p><a class="btn btn-lg btn-primary" href="#info">Scopri di più</a></p>
                    </div>
                </div>
            </div>
            <div class="carousel-item active carousel-item-start">
                <div class="w-100 h-100 position-absolute bg-black bg-opacity-50 " />
                <img src="/walpaper_carousel_3.jpg" class="w-100 h-100 object-fit-cover " alt="">
                <div class="container">
                    <div class="carousel-caption text-end">
                        <h1>Prodotti in offerta</h1>
                        <p>Scopri le nostre migliori offerte della settimana</p>
                        <p><a class="btn btn-lg btn-primary" href="#products">Products</a></p>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<style scoped>
.carousel-item {
    height: 32rem;
}
</style>