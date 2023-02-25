<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">{{ count }}</button>
  <input type="text" v-model="todo" />
  <button class="addTodo" @click="addTodo">addTodo</button>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo }}
    </li>
  </ul>
  <button class="loadUser" @click="loadUser">loadusers</button>
  <p v-if="user.loading" class="loading">loading</p>
  <div v-else class="userName">{{ user.data?.username }}</div>
  <p v-if="user.error" class="error">error</p>
  <hello msg="1234"></hello>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Hello from "./Hello.vue";
import axios from "axios";

export default defineComponent({
  components: { Hello },
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      default: "Hello World",
    },
  },
  emits: ["send"],
  setup(props, content) {
    const count = ref(1);

    const todo = ref("");
    const todos = ref<string[]>([]);
    const user = reactive({
      data: null as any,
      loading: false,
      error: false,
    });

    const addTodo = () => {
      if (todo.value) {
        todos.value.push(todo.value);
        content.emit("send", todo.value);
        todo.value = "";
      }
    };

    const loadUser = () => {
      user.loading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/users/1")
        .then((resp) => {
          console.log(resp.data);
          user.data = resp.data;
        })
        .catch(() => {
          user.error = true;
        })
        .finally(() => {
          user.loading = false;
        });
    };
    return {
      count,
      todo,
      todos,
      addTodo,
      user,
      loadUser,
    };
  },
});
</script>

<style></style>
