<script setup>

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
    }
});

function discountPrice(price, discount) {
    return (price - (price * discount / 100)).toFixed(2)
}

</script>

<template>
    <div class="card shadow-sm h-100">
        <img src="/logo_icon.png" width="100%" height="300px" class=" object-fit-contain" alt="">
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h2>
                    {{ title }}
                </h2>
                <p class="card-text">
                    {{ description }}
                </p>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-5">
                <button class="btn btn-primary px-5">
                    buy
                </button>
                <div v-if="discount">
                    <small class="text-body-secondary">
                        <div class="d-flex gap-1">
                            <span class="text-decoration-line-through">
                                {{ price }}€
                            </span>
                            <span>
                                {{ discount }}%
                            </span>
                        </div>
                        {{ discountPrice(price, discount) }}€
                    </small>
                </div>
                <div v-else>
                    <small class="text-body-secondary">
                        {{ price }} €
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>