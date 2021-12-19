<template>
  <div>
    <h3>Times Tables!
      <button
          title="Regenerate the problems"
          class="refresh"
          @click="refresh()">&#x21bb;</button>
    </h3>
    <confetti-explosion
        v-if="allCompleted"
        style="margin: auto" :stageHeight="winHeight"></confetti-explosion>
    <span v-for="(item, index) in problems">
      <single-problem
          :problem="item"
          @problem-changed="onProblemChanged"
      ></single-problem>
      <br v-if="(1+index) % columns === 0"/>
    </span>
  </div>
</template>

<style lang="scss">
button.refresh {
  font-size: larger;
  font-family: Lucida Sans Unicode;
  border: none;
  background: transparent;
  color: skyblue;
}
</style>

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

export type Nullable<T> = T | null;

function areEquivalent(
    numbers1: number[],
    numbers2: number[]
) {
  return numbers1.length === numbers2.length &&
      numbers1.reduce((acc: boolean, cur: number) => acc && numbers2.includes(cur), true) &&
      numbers2.reduce((acc: boolean, cur: number) => acc && numbers1.includes(cur), true);
}

export default defineComponent({
  components: { SingleProblem },
  data() {
    return {
      columns: 7,
      rows: 4,
      minOperand: 2,
      maxOperand: 12,
      problems: [] as IProblem[],
      allCompleted: false,
      winHeight: window.innerHeight
    }
  },
  methods: {
    generateProblem(): Nullable<IProblem> {
      let attempts = 100;
      while (--attempts) {
        const
            left = randInt(this.minOperand, this.maxOperand),
            right = randInt(this.minOperand, this.maxOperand),
            alreadyGenerated = !!this.problems.find(o => areEquivalent([o.left, o.right], [left, right]));
        if (alreadyGenerated) {
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
    },
    onProblemChanged() {
      this.allCompleted = this.problems.reduce((acc: boolean, cur: IProblem) => {
        return acc && cur.answer === cur.solution;
      }, true);
    },
    refresh() {
      this.problems = [];
      const count = this.rows * this.columns;
      for (let i = 0; i < count; i++) {
        const thisProblem = this.generateProblem();
        if (!thisProblem) {
          return;
        }
        this.problems.push(thisProblem);
      }
    },
  },
  mounted() {
    this.refresh();
  },
});
</script>

