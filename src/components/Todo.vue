<template>
    <div class="row">
        <div class="row">
            <div class="alert alert-dismissible fade show" :class="[isActive ? 'alert-danger' : 'alert-info']" role="alert"
            v-if="show">
            <span> {{ message }}</span>
            <button type="button" class="close btn" @click="show = !show">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="col-sm-12 text-center text-bg-dark">
            <label for="" class="col-form-label col-form-label-lg">TODO Table</label>
        </div>
        <div class="col-sm-12 ">
            <label for="" class="col-form-label col-form-label-lg">Title</label>
            <input type="text" class="form-control form-control-lg" v-model="form.title">
            <span v-if="error.title" class="text-danger"> {{ error.title }}</span>
        </div>

        <div class="col-sm-12 ">
            <label for="" class="col-form-label col-form-label-lg">Description</label>
            <input type="text" class="form-control form-control-lg" v-model="form.description">
            <span v-if="error.description" class="text-danger"> {{ error.description }}</span>
        </div>

        <div class="col-sm-12 text-center mt-4">
            <button @click="save" class="text-bg-info col-6 p-2 btn btn-light"> 
                {{ isEditble ? 'update' : 'Save' }}
            </button>
        </div>
        </div>

        <div class="row mt-3" v-if="todoList.length > 0">
            <div class="col-12">
                <table class="table table-active table-bordered">
                    <tr class="text-bg-light text-center col-12">
                        <th class="p-3" colspan="5">Todo List</th>
                    </tr>
                    <tr class="text-bg-dark text-start">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th colspan="2" class="text-center">Action</th>
                    </tr>
                    <tr v-for="todo in todoList" :key="todo.id" class="col-12 text-start">
                        <td>{{ todo.id }}</td>
                        <td>{{ todo.title }}</td>
                        <td>{{ todo.description }}</td>
                        <td>
                            <button class="btn text-bg-warning" @click="edit(todo.id)">Edit</button>
                        </td>
                        <td>  
                            <button class="btn text-bg-danger" @click="deleteTodo(todo.id)">Delete</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-else>
            Data Not Found
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "TodoList",
    data() {
        return {
            form: {
                title: '',
                description: '',
                id:''
            },
            error: {
                title: '',
                description: ''
            },
            //hide/show alert box 
            show: false,
            message: '',
            //Change alert message background color 
            isActive: true,
            todoList:[],
            isEditble:false,
        }
    },
    methods: {
        async save() {
            let method = axios.post;
            let url = "http://localhost:8000/api/todo/create";

            if(this.isEditble) {
                method = axios.put;
                url = `http://localhost:8000/api/todo/update/${this.form.id}`;
            }

            let result = await method(url,this.form);
             // show alert box 
            this.show = true;

            this.message = result.data.message;

            if (result.data.error) {
                this.error = result.data.error;
                // Change alert message background color 
                this.isActive = true;
            } else {
                this.isActive = false;
                this.clearData();
                this.isEditble = false;
            }
            this.fetchAll();
        },
        async fetchAll() {
            let result = await axios.post("http://localhost:8000/api/todo/list");
            this.todoList = result.data.data.data;
            console.log(this.todoList.data.length);

        },
        clearData() {
            this.error = [
                this.title = '',
                this.description = '',
            ];
            this.form = [
                this.title = '',
                this.description = '',
            ];
        },
        deleteTodo(id) {
            if(confirm("Are you sure to delete this record ?")){
                axios.delete("http://localhost:8000/api/todo/delete/"+id)
                .then(()=> this.fetchAll())
                .then(res => this.message = res);
            }
        },
        async edit(id) {
            let result = await axios.get("http://localhost:8000/api/todo/get/"+id);
            this.form = result.data.data;
            this.isEditble = true;
        }
    },
    mounted() {
        this.fetchAll();
    },
    
}
</script>