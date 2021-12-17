<script lang="ts">
import { defineComponent } from "vue";
import SingleProblem from "./single-problem.vue";

export interface IProblem {
  left: number;
  right: number;
  answer: Nullable<number>;
  solution: number;
}

function randInt(min: number, max: number): number {
  const
      range = max - min,
      floaty = min + (Math.random() * range);
  return parseInt(floaty.toFixed(0));
}

type Nullable<T> = T | null;

export default defineComponent({
  components: { SingleProblem },
  data() {
    return {
      columns: 7,
      rows: 4,
      minOperand: 2,
      maxOperand: 12,
      problems: [] as IProblem[]
    }
  },
  methods: {
    generateProblem(): Nullable<IProblem> {
      let attempts = 100;
      while (--attempts) {
        const
            left = randInt(this.minOperand, this.maxOperand),
            right = randInt(this.minOperand, this.maxOperand);
        if (this.problems.find(o => o.left === left && o.right === right)) {
          continue;
        }
        return {
          left,
          right,
          solution: left * right,
          answer: null
        }
      }
      console.error("Unable to generate unique problem within 100 iterations");
      return null;
    }
  },
  setup() {
  },
  mounted() {
    this.problems = [];
    const count = this.rows * this.columns;
    for (let i = 0; i < count; i++) {
      const thisProblem = this.generateProblem();
      if (thisProblem === null) {
        return;
      }
      this.problems.push(thisProblem);
    }
  },
});
</script>

<template>
  <span v-for="(item, index) in problems">
    <single-problem
        :problem="item"
    ></single-problem>
    <br v-if="(1+index) % columns === 0" />
  </span>
</template>
