<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { calculateFinalBalance } from './utils/calculateFinalBalance';

const interestPeriods = {
  month: {
    maxPaymentsPerYear: 12,
    isCompound: true,
  },
  quarter: {
    maxPaymentsPerYear: 4,
    isCompound: true,
  },
  annual: {
    maxPaymentsPerYear: 1,
    isCompound: true,
  },
  maturity: {
    maxPaymentsPerYear: 1,
    isCompound: false,
  }
};

export default {
  setup () {
    return { v$: useVuelidate() };
  },
  data () {
    return {
      depositAmount: '',
      finalBalance: '',
      selectedInterestPeriod: '',
      interestPeriods: [
        {
          label: 'Monthly',
          value: 'month',
        },
        {
          label: 'Quarterly',
          value: 'quarter',
        },
        {
          label: 'Annually',
          value: 'annual',
          minInvestmentMonths: 12,
        },
        {
          label: 'At Maturity',
          value: 'maturity',
        }
      ],
      interestPercentage: '',
      investmentMonths: '',
    };
  },
  validations () {
    return {
      depositAmount: { required, minValue: minValue(0) },
      interestPercentage: { required, minValue: minValue(0) },
      investmentMonths: { required, minValue: minValue(0) },
      selectedInterestPeriod: { required },
    };
  },
  computed: {
    validInterestPeriods() {
      return this.interestPeriods.filter(interestPeriod => !interestPeriod.minInvestmentMonths || this.investmentMonths >= interestPeriod.minInvestmentMonths);
    }
  },
  methods: {
    async submit() {
      this.finalBalance = '';
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      const selectedInterestPeriod = interestPeriods[this.selectedInterestPeriod];
      return this.finalBalance = calculateFinalBalance({
        depositAmount: this.depositAmount,
        interestRate: this.interestPercentage / 100,
        investmentMonths: this.investmentMonths,
        maxPaymentsPerYear: selectedInterestPeriod.maxPaymentsPerYear,
        isCompound: selectedInterestPeriod.isCompound
      });
    }
  }
};</script>

<template>
  <div class="container">
    <div class="section">
      <label for="deposit-amount">Deposit amount ($)</label>
      <div :class="{ error: v$.depositAmount.$errors.length }">
        <input id="deposit-amount" v-model="depositAmount" type="number" />
        <div class="input-errors" v-for="error of v$.depositAmount.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <label for="interest-rate">Interest rate (% p.a.)</label>
      <div :class="{ error: v$.interestPercentage.$errors.length }">
        <input id="interest-rate" v-model="interestPercentage" type="number" />
        <div class="input-errors" v-for="error of v$.interestPercentage.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <label for="investment-term">Investment term (months)</label>
      <div :class="{ error: v$.investmentMonths.$errors.length }">
        <input id="investment-term" v-model="investmentMonths" type="number" />
        <div class="input-errors" v-for="error of v$.investmentMonths.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <label for="cars">Interest paid</label>
      <div :class="{ error: v$.selectedInterestPeriod.$errors.length }">
        <select v-model="selectedInterestPeriod">
          <option v-for="option in validInterestPeriods" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div class="input-errors" v-for="error of v$.selectedInterestPeriod.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <button @click="submit">Calculate</button>
    </div>
    <div class="section">
      <div>Final balance ($): {{ finalBalance }}</div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
}
.section {
  padding: 10px;
}
.error-msg {
  color: red;
}
select, input, button {
  width: 150px;
  padding: 0px;
  margin: 0px;
}
</style>