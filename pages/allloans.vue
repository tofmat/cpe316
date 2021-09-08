<template>
  <div class="big">
      <div class="header">
      <div class="flex spaceBetween alignCenter">
        <img src="../assets/logocolored.png" alt="logo">
        <div>
          <v-btn class="signBtn" to="/loan">Apply</v-btn>
        </div>
      </div>
    </div>
      <div class="allLoan"> 
          <h3 class="all">All Loans</h3>
        <v-data-table
            :headers="headers"
            :items="loans"
            :items-per-page="20"
            class="elevation-1"
        ></v-data-table>
        </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'First Name',
            align: 'start',
            sortable: false,
            value: 'First_name',
          },
          { text: 'Last Name', value: 'Last_name' },
          { text: 'Dependents', value: 'Dependents' },
          { text: 'Applicant Income', value: 'ApplicantIncome' },
          { text: 'Guarantors Income', value: 'CoapplicantIncome' },
          { text: 'Loan Amount', value: 'LoanAmount' },
          { text: 'Loan Amount Term', value: 'Loan_Amount_Term' },
          { text: 'Married', value: 'Married' },
          { text: 'Eligibility', value: 'eligible_for_loan' }
        ]
      }
    },
    async asyncData({$axios}){
        let response = await $axios.get('/your_applications')
        let loans = response.data;
        return {
            loans
        }
    },
  }
</script>

</script>
<style scoped>
.big {
  background-color: #2F2E41;
}
.header {
  padding: 30px;
  padding-bottom: 0 !important;
}
.flex {
  display: flex;
}
.spaceBetween {
  justify-content: space-between;
}
.justifyCenter {
  justify-content: center;
}
.alignCenter {
  align-items: center;
}
.signBtn {
  background-color: #FF3926 !important;
  color: white !important;
  border-radius: 10px;
}
.mainBack {
  min-height: calc(100vh - 50px);
  background: url('../assets/mainBack.png');
  padding: 10px 100px;
  background-size: cover;
  background-repeat: no-repeat;
}
.loginPanel {
  background: rgba(255, 255, 255, 0.884);
  width: 400px;
  padding: 100px 20px;
  height: fit-content;
  border-radius: 20px;
}
.logBtn {
  margin-top: 30px;
  background-color: black !important;
  color:  white !important;
}
.allLoan {
    padding: 10px 30px;
    padding-bottom: 50px;
}
.all {
    color: white;
    padding-top: 30px;
    padding-bottom: 20px;
}
@media (max-width: 600px) {
  .header {
    padding: 10px !important;
  }
  .allLoan {
    padding: 10px 10px;
    padding-bottom: 50px;
}
.all {
    padding-top: 10px;
}
  .loginPanel {
    width: 90% !important;
  }
  .mainBack {
    padding: 10px 25px;
    align-items: flex-start;
    margin-top: 50px;
  }
}
</style>