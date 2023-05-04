<template>
    <div class="row text-bg-light">
        <div class="col-12 text-bg-info col-12 p-3">
            Emite Example
        </div>
        <div class="col-6  col-6 p-3">
            <input type="text" class="form-control col-6 mt-2" v-model="name" placeholder="name">
        </div>
        <div class="col-6  col-6 p-3">
            <input type="text" class="form-control col-6 mt-2" v-model="email" placeholder="email">
        </div>
        <div class="col-12">
            <button @click="performEmit" class="btn col-6 text-primary btn-info">Send</button>
            <button @click="performEventBus" class="btn col-6 text-primary btn-dark">Event Bus</button>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/event-bus';
export default {
    name: 'EmiteExample',
    data() {
        return {
            name: '',
            email: ''
        }
    },
    methods: {
        performEmit() {
            this.$emit('emitted_data', this.name);
        },
        performEventBus() {
            this.$router.push('/file-upload');
            setTimeout(() => {
                eventBus.$emit('event_bus_emitted', {
                    name: this.name,
                    email: this.email
                })
            }, 1000)
        }
    }
}
</script>