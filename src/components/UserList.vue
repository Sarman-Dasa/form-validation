<template>
    <div class="row">
        <div class="col-6">
            <table class="table table-active table-bordered">
                    <tr class="text-bg-light text-center col-12">
                        <th class="p-3" colspan="4">Normal user List</th>
                    </tr>
                    <tr class="text-bg-dark text-start">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                    </tr>
                    <tr v-for="user in users" :key="user.id" class="col-12 text-start">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.age }}</td>
                        <td>{{ user.city }}</td>
                    </tr>
                </table>
        </div>

        <div class="col-6">
            <table class="table table-active table-bordered">
                    <tr class="text-bg-light text-center col-12">
                        <th class="p-3" colspan="5">Filter user List</th>
                    </tr>
                    <tr class="text-bg-dark text-start">
                        <th>ID</th>
                        <th>Name</th>
                        <th>
                            <button @click="increaseAge" class="btn text-primary">+</button>
                            Age
                            <button @click="decreaseAge" class="btn text-primary">-</button>
                        </th>
                        <th>City</th>
                    </tr>
                    <tr v-for="user in filterUser" :key="user.id" class="col-12 text-start">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.age }}</td>
                        <td>{{ user.city }}</td>
                    </tr>
                </table>
                
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            users() {
                return this.$store.state.users;
            },
            filterUser() {
                return this.$store.getters.filterUser;
            }
        },
        methods: {
            increaseAge() {   
               this.$store.commit('increaseAge');
            },
            decreaseAge() {
                this.$store.commit('decreaseAge');
            }
        }
    }
</script>