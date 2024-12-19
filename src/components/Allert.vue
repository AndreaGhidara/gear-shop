<script setup>
// Props
const props = defineProps({
    status: {
        type: String,
        required: true,
        default: ""
    },
    text: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Funzione per determinare la classe basata sullo stato
function setStatus(status) {
    switch (status) {
        case "success":
            return "alert-success";
        case "danger":
            return "alert-danger";
        case "warning":
            return "alert-warning";
        case "info":
            return "alert-info";
        default:
            return "alert-light";
    }
}

</script>

<template>
    <!-- Div Alert -->
    <div v-if="isVisible" style="z-index: 999999999!important;" :class="`position-fixed top-0 start-0 z-3 w-100 alert ${setStatus(props.status)}`"
        role="alert">
        {{ text }}
    </div>
</template>
