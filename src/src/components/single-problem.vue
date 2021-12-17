<template>
    <table class="problem-container">
      <tr>
        <td></td>
        <td>{{ problem.left }}</td>
      </tr>
      <tr>
        <td>x</td>
        <td>{{ problem.right }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <input type="number"
                 :class="{ }"
                 v-model="problem.answer"
                 @keyup="onKeyDown">
        </td>
      </tr>
    </table>
</template>

<style lang="scss">
table.problem-container {
  background: #333;
  border-radius: 5px;
  border: 1px solid #444;
  font-size: xx-large;
  display: inline-block;
  padding: 5px;
  margin: 5px;

  tr {
    td {
      &:nth-child(2) {
        min-width: 1em;
      }
      text-align: right;
      input[type="number"] {
        -moz-appearance: textfield;
        font-size: xx-large;
        max-width: 2em;
        background: #111;
        color: #eee;
        border-radius: 5px;
        border: 1px solid #555;
        text-align: right;
      }
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { IProblem } from "./problem-grid.vue";

export default defineComponent({
  props: {
    problem: {
      type: Object as () => IProblem,
      default: undefined
    },
  },
  setup(props, { emit }) {
  },
  methods: {
    onKeyDown(ev: KeyboardEvent) {
      console.log({
        left: this.problem?.left,
        right: this.problem?.right,
        answer: this.problem?.answer,
        answerType: typeof(this.problem?.answer)
      });
    }
  }
});
</script>
