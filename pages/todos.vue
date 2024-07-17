<template>
  <h1 class="text-3xl font-bold mb-4 text-center">Vue 3 ToDo App</h1>
  <form
    @submit.prevent="addTodo"
    class="w-full"
  >
    <v-text-field
      label="New todo"
      variant="outlined"
      v-model="newTodo"
    ></v-text-field>
    <v-btn
      class="mb-12"
      type="submit"
      block
    >Add</v-btn>
  </form>
  <v-card
    v-if="todos.length"
    class="mx-auto w-full"
  >
    <v-list density="compact">
      <v-list-subheader>TODOS</v-list-subheader>

      <v-list-item
        v-for="(todo, i) in todos.filter(todo => !todo.completed)"
        hide-details
        density="compact"
        :key="i"
        color="primary"
        @click="updateTodo(todo)"
      >
        <v-checkbox
          hide-details
          :label="todo.text"
          :model-value="!!todo.completed"
          readonly
        ></v-checkbox>
      </v-list-item>
    </v-list>
  </v-card>
  <v-card
    v-if="todos.length"
    class="mx-auto w-full mt-8"
  >
    <v-list density="compact">
      <v-list-subheader>COMPLETED</v-list-subheader>

      <v-list-item
        v-for="(todo, i) in todos.filter(todo => todo.completed)"
        hide-details
        density="compact"
        :key="i"
        color="primary"
        @click="updateTodo(todo)"
      >
        <v-checkbox
          hide-details
          :label="todo.text"
          :model-value="!!todo.completed"
          readonly
        ></v-checkbox>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
const { data } = await useFetch('/api/todos');

let todos = reactive(data)
let newTodo = ref('');

const addTodo = async () => {
  if (newTodo.value.trim()) {

    const newRows = await $fetch('/api/todos.add', {
      method: 'POST',
      body: JSON.stringify({ text: newTodo.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    newTodo.value = '';
    todos.value = [...newRows];
  }
};

const updateTodo = async (todo) => {
  console.log(todo)
  
  todo.completed == 0 ? todo.completed = 1 : todo.completed = 0;

  const newRows = await $fetch('/api/todos.update', {
    method: 'POST',
    body: JSON.stringify({ id: todo.id, completed: todo.completed }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  todos.value = [...newRows];
};

// const removeTodo = (index) => {
//   todos.splice(index, 1);
// };

</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>