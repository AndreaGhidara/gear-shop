<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Offcanvas Title',
    },
});
</script>

<template>
    <!-- Trigger Button -->
    <div>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" :data-bs-target="`#${props.id}`"
            :aria-controls="props.id">
            <slot name="trigger">Open Offcanvas</slot>
        </button>
    </div>

    <!-- Offcanvas -->
    <div class="offcanvas" :class="`offcanvas-start`" :tabindex="`${props.id}`" :id="id" :aria-labelledby="`${props.id}-label`">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" :id="`${props.id}-label`">{{ props.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <slot>
                <!-- Default content if no slot is provided -->
                <p>This is the default body content of the Offcanvas component.</p>
            </slot>
        </div>
    </div>
</template>

<style scoped>
/* Optional Custom Styles */
</style>
