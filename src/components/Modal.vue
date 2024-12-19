<script setup>
defineProps({
    textOnButton: {
        type: String,
        required: false,
        default: "view"
    },
    id: {
        type: String,
        required: true // ID univoco per il modal
    },
    title: {
        type: String,
        default: "Modal Title" // Titolo del modal
    },
});

</script>

<template>
    <div>
        <!-- Trigger Button -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#' + id">
            {{ textOnButton }}
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="id" :tabindex="id" :aria-labelledby="id + '-label'" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Header -->
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="id + '-label'">{{ title }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        <slot name="body">{{ body }}</slot>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button> -->

                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
