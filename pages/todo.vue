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
        v-for="(todo, i) in todos"
        hide-details
        density="compact"
        :key="i"
        :value="todo"
        color="primary"
      >
        <v-checkbox
          hide-details
          :label="todo.text"
          v-model="todo.completed"
        ></v-checkbox>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>

const newTodo = ref('');
const todos = reactive([]);

watch(todos, (newTodos, oldTodos) => {
  console.log(newTodos)
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.push({ text: newTodo.value, completed: false });
    newTodo.value = '';
  }
};

const removeTodo = (index) => {
  todos.splice(index, 1);
};

</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>