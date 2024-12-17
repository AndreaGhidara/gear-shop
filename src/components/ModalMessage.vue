<script setup>

defineProps({
    id: {
        type: Number,
        required: true
    },
    message: {
        type: Object,
        required: true
    },
    action: {
        type: Function,
        required: true
    }
});

</script>

<template>
    <div>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" :data-bs-target="'#' + id">
            edit
        </button>
        <div class="modal fade" :id="id" :tabindex="id" :aria-labelledby="id" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">From : <span
                                class="text-uppercase fw-bold">{{ message.name || "no name" }}</span> </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <small> <span class="fw-semibold">email</span> : {{ message.email || "no mail" }} </small>
                        <p class="m-0 fw-semibold">message </p>
                        <div class="border p-2">
                            <p>{{ message.message }}</p>
                        </div>
                        {{ message.status || "no status" }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="action(id, 'working', message.status)">Set
                            Woking</button>
                        <button type="button" class="btn btn-secondary" @click="action(id, 'end', message.status)">Set
                            End</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped></style>