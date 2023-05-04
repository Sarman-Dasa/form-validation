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

        <div class="row mt-3">
            <div class="row">
                <div class="col-6">
                    <select name="" id="" v-model="perPage" class="form-select">
                        <option value="2">02</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div class="col-6">
                    <input type="text" v-model="search" class="form-control" placeholder="Search data">
                </div>
            </div>
            <div class="col-12" v-if="todoList.length > 0">
                <table class="table table-active table-bordered">
                    <tr class="text-bg-light text-center col-12">
                        <th class="p-3" colspan="5">Todo List</th>
                    </tr>
                    <tr class="text-bg-dark text-start">
                        <th>#SrNo</th>
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
                <div>
                    <div class="row text-bg-light text-center col-12">
                        <div class="col-2">
                            <span>Total Data:- {{ total }}</span>
                        </div>
                        <div class="col-10">
                            <ul class="list-group list-group-horizontal">
                                <li v-for="next in lastPage" :key="next" class="list-group-item">
                                    <span @click="page = next">{{ next }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                Data not Found!!!
            </div>
        </div>
        <!-- <div v-else>
            Data Not Found
        </div> -->
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
                id: ''
            },
            error: {
                title: '',
                description: ''
            },
            perPage: 10,
            search: '',
            page: 0,
            //hide/show alert box 
            show: false,
            message: '',
            //Change alert message background color 
            isActive: true,
            todoList: [],
            isEditble: false,
            lastPage: 0,
            total: 0,
        }
    },
    methods: {
        async save() {
            let method = axios.post;
            let url = "http://localhost:8000/api/todo/create";

            if (this.isEditble) {
                method = axios.put;
                url = `http://localhost:8000/api/todo/update/${this.form.id}`;
            }

            let result = await method(url, this.form);
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
            let result = await axios.post("http://localhost:8000/api/todo/list", {
                perPageData: this.perPage,
                search: this.search,
                page: this.page,
            });
            this.todoList = result.data.data.data;
            this.total = result.data.data.total;
            this.lastPage = result.data.data.last_page;
            console.log(result.data.data);

        },
        clearData() {
            this.error.title = '',
                this.error.description = '',
                this.form.title = '',
                this.form.description = ''
        },
        deleteTodo(id) {
            if (confirm("Are you sure to delete this record ?")) {
                axios.delete("http://localhost:8000/api/todo/delete/" + id)
                    .then(() => this.fetchAll())
                    .then(res => this.message = res);
            }
        },
        async edit(id) {
            let result = await axios.get("http://localhost:8000/api/todo/get/" + id);
            this.form = result.data.data;
            this.isEditble = true;
        },
        // test(pageNumber){

        // }
    },
    mounted() {
        this.fetchAll();
    },
    watch: {
        perPage() {
            this.fetchAll();
        },
        search() {
            this.fetchAll();
        },
        page() {
            this.fetchAll();
        }
    }

}
</script>

<style>
li:hover
{
    cursor: pointer;
}
</style>