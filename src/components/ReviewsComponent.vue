<script setup>
const props = defineProps({
    reviews: {
        type: Array,
        required: true,
    },
})



</script>

<template>
    <div v-if="props.reviews && props.reviews.length > 0">
        <div class="row d-flex flex-wrap gap-1">
            <div v-for="review in props.reviews" class="col">
                <div class="card border-light mb-3 h-100" style="max-width: 18rem;">
                    <div class="card-header bg-primary d-flex flex-row-reverse ">
                        <span class="pe-2 ps-2 text-white fw-bold">
                            {{ review.rating }}
                        </span>
                        <div v-for="n in Number(review.rating)">
                            <svg class="star-svg" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/2000/xlink" width="21px" height="20px">
                                <path d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
        l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z" />
                            </svg>
                        </div>
                    </div>
                    <div class="card-body border border-top-0 rounded-2 rounded-top-0 border-black p-2">
                        <h5 class="card-title fs-6 border-bottom border-black pb-2">{{ review.name }}</h5>
                        <p class="card-text">{{ review.comment ? review.comment : "No comment" }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="text-center">No review</p>
    </div>
</template>


<style scoped>
.star-svg {
    background-color: #ff0;

}

.star-svg path {
    fill: #0D6EFD;
}
</style>