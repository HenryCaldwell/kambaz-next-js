"use client";
import { CounterProvider } from "./counter/context";
import CounterContext from "./counter/index";
import ReactContextTodoList from "./todos";
import { TodosProvider } from "./todos/context";

export default function ReactContextExamples() {
  return (
    <div>
      <h1>React Context Examples</h1>
      <CounterProvider>
        <CounterContext />
      </CounterProvider>
      <TodosProvider>
        <ReactContextTodoList />
      </TodosProvider>
    </div>
  );
}
