<template>
  <table class="problem-container">
    <tr>
      <td></td>
      <td>{{ problem?.left }}</td>
    </tr>
    <tr>
      <td>x</td>
      <td>{{ problem?.right }}</td>
    </tr>
    <tr>
      <td colspan="2">
        <input type="number"
               :class="{ answered, correct }"
               v-model="answer"/>
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

        &:focus {
          outline: none;
        }

        &.answered {
          border-color: red;

          &.correct {
            border-color: green;
          }
        }
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
import { IProblem, Nullable } from "./problem-grid.vue";

export default defineComponent({
  props: {
    problem: {
      type: Object as () => IProblem,
      default: null
    },
  },
  watch: {
    answer (newValue: number) {
      this.answered = !!`${this.answer}`.length
      if (!this.problem) {
        return;
      }
      this.problem.answer = newValue;
      this.correct = this.problem.answer === this.problem.solution;
      this.$emit("problem-changed", this.problem);
    }
  },
  data() {
    return {
      answered: false,
      correct: false,
      answer: null as Nullable<number>
    }
  },
});
</script>
