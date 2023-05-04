<template>
    <div class="row">
        <div class="alert alert-dismissible fade show" :class="[isActive ? 'alert-danger' : 'alert-info']" role="alert"
            v-if="showAlert">
            <li v-for="message in messages" :key="message"> {{ message }}</li>
            <button type="button" class="close btn float-end" @click="showAlert = !showAlert">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="col-12">
            <div class="col-sm-12 ">
                <label for="" class="col-form-label col-form-label-lg">Image</label>
                <input type="file" class="form-control form-control-lg" ref="file" @change="uploadFile">
            </div>
            <div class="col-12">
                <button class="btn col-12 btn-info mt-4" @click="save">Upload</button>
            </div>
        </div>

        <!-- Event Bus Data Print -->
        <div class="col-12">
            <h3>Event Bus Data</h3>
          <label for="" class="d-block">{{ userData.name }}</label>
          <label for="">{{ userData.email }}</label>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../src/event-bus.js';
export default {
    name: "FileUpload",
    data() {
        return {
            file: null,
            showAlert: false,
            isActive: false,
            messages: [],
            page: 1,
            count: 12,
            pageSize: 10,
            userData:[]
        }
    },
    methods: {
        uploadFile(e) {
            this.file = e.target.files[0];
            console.log(this.file);
        },
        async save() {
            const formData = new FormData();
            formData.append('file', this.file);
            const headers = { 'Content-Type': 'multipart/form-data' };
            let result = await axios.post("http://localhost:8000/api/todo/file-upload", formData, { headers })
                .then(res => this.messages.push(res.data.message))
                .catch(err => this.messages = err.response.data.errors.file);
            this.message = result;
            this.showAlert = true;
        },
        handlePageChange() {
            alert("work");
        }
    },
    mounted() {
        eventBus.$on('event_bus_emitted',(data) => {
            this.userData = data;
        })
    }
}
</script>