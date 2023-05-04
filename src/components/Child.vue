<template>
    <div class="row text-bg-light">
        <div class="col-12 text-bg-info col-12 p-3">
            Emite Example
        </div>
        <div class="col-12  col-12 p-3">
            <input type="text" class="form-control mt-2" v-model="name">
        </div>
        <div class="col-12">
            <button @click="performEmit" class="btn col-12 text-primary btn-info">Send</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EmiteExample',
        data() {
            return {
                name:'',
            }
        },
        methods: {
            performEmit() {
                this.$emit('emitted_data', this.name);
            }
        }
    }
</script>