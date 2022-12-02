<template>
  <div class="home">
     <!-- {{ currentTodo }} -->
    <v-text-field
      v-model="currentTodo.description"
      @click:append="save"
      @keyup.enter="save"
      class="pa-3"
      outlined
      :label="`${currentTodo.id ? 'Update' : 'Add'} Todo`"
      append-icon="mdi-note-plus"
      hide-details
      clearable
    ></v-text-field>
 
    <v-list class="pt-0" flat v-if="todoList.length">
      <div v-for="todo in todoList" :key="todo.id">
        <v-list-item
          @click="setTodoStatus(todo.id)"
          :class="{ 'blue lighten-4': todo.status}"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :input-value="todo.status"
                color="primary"
                name="check"
              ></v-checkbox>
            </v-list-item-action>
            
            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': todo.status }"
              >
                {{ todo.description }} <p>2022-06-03</p> 
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="orange darken-2">mdi-calendar-clock</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn @click.stop="updateCurrentTodo(todo)" icon>
                <v-icon color="primary lighten-1">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn @click.stop="deleteTodo(todo.id)" icon>
                <v-icon color="error lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>   
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <v-list v-else>
        <h2 style="text-align: center; margin-top: 50px; ">No Users Found for this search: {{currentTodo.description}}</h2>
    </v-list>
    

    <div class="text-center">
    <v-btn
      rounded
      color="primary"
      dark
      @click="updateCurrentTodo"
    >
      Go Back to Add Todo

    </v-btn>
  </div>
  </div>
</template>

<script>
import axios from "axios";



const baseUrl = "http://10.107.0.14:8080/todo";
export default {
  name: "Home",

  data() {
    return {
      todos: [],
      currentTodo: {
          id: 0,
          description: "",
          status: 1,
        },
     
       
    };
  },
  methods: {
   getTodo() {
      axios
        .get(baseUrl)
        .then((response) => {
          this.todos = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      // update
      if (this.currentTodo.id){
        return this.editTodo(this.currentTodo.id, this.currentTodo.description);
      }else{ 
        return this.addTodo();
      } 
    },
    
    async addTodo() {
      console.log("Adding new todo...");
     
      try {
        // console.log("this.todo.description: ", this.todo.description);
        await axios.post(baseUrl, { description: this.currentTodo.description});

        // do something with the response

        this.currentTodo.description = "";
        this.getTodo();
      } catch (err) {
        console.log(err);
      }
    },

    
    setTodoStatus(id) {
      // status:
      // 1 or 0
      //console.log('id', id);
      let todo = this.todos.filter(todo => todo.id === id)[0]
      todo.status = !todo.status    
      console.log('currentTodo', todo.status);
      
    },
    async deleteTodo(id) {
      try {
        //console.log("id: ", id);
        const resp = await axios.delete(baseUrl + "/" + id);
        // do something with the response
        console.log(resp);
        this.getTodo();
      } catch (err) {
        console.log(err);
      }
    },
    updateCurrentTodo(todo) {
      this.currentTodo.id = todo.id;
      this.currentTodo.description = todo.description ?? "";
    },
    async editTodo(id, todo) {
      console.log("Editing existing todo..."); 
      this.currentTodo.description = todo;

    try {
        const resp = await axios.put(baseUrl + "/" + id, {
          description: this.currentTodo.description,
        });
        // do something with the response
        this.currentTodo.description = "";
        console.log(resp);
        this.getTodo();
      } catch (err) {
        console.log(err);
      }
    },

   


  }, //end of method
  mounted() {
  
    this.getTodo();
  },

  computed: {
    todoList() {
      if(this.currentTodo.description.trim().length > 0)
      {
        return this.todos.filter((todo) => todo.description.toLowerCase().includes(this.currentTodo.description.trim().toLowerCase()));
      }
      return this.todos;
      
    }
  }


};
</script>

