<template>
  <div class="bigBack">
    <div class="header">
      <div class="flex spaceBetween alignCenter">
        <img src="../assets/logo.png" alt="logo">
        <div>
          <v-btn class="signBtn" @click="logout()">Log Out</v-btn>
        </div>
      </div>
    </div>
    <div class="mainBack flex justifyCenter alignCenter">
      <div class="loginPanel">
        <div>
          <h3>Fill form below to view loan eligibility</h3>
          <form @submit.prevent="submitLoan(loanInfo)">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.First_name"
                    label="First Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.Last_name"
                    label="Last Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.id"
                    :disabled="true"
                    label="Loan ID"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.ApplicantIncome"
                    label="Income (Amount)"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="gender"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Gender"
                  label="Gender"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.CoapplicantIncome"
                    label="Guarantor Income (Amount)"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="maritalStatus"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Married"
                  label="Marital Status"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.LoanAmount"
                    label="Loan Amount"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="dependants"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Dependents"
                  label="Dependants"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="loanInfo.Loan_Amount_Term"
                    label="Loan Terms (Month)"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="education"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Education"
                  label="Education"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="creditHisory"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Credit_History"
                  label="Credit History"
                ></v-select>
                </v-col>


                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="employmentStatus"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Self_Employed"
                  label="Employement Status"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                  :items="propertyArea"
                  item-value="value"
                  item-text="name"
                  v-model="loanInfo.Property_Area"
                  label="Property Area"
                ></v-select>
                </v-col>
              </v-row>
            </v-container>

            <v-btn class="signBtn" type="submit" :loading = loading>Check Status</v-btn>
          </form>
        </div>
      </div>
    </div>

    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        width="600"
      >
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title>
              Congratulations!!!
            </v-card-title>

            <v-card-text>
              You are eligible for a loan!
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog.value = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>


    <v-col cols="auto">
      <v-dialog
        v-model="otherDialog"
        transition="dialog-top-transition"
        width="600"
      >
        <template v-slot:default="otherDialog">
          <v-card>
            <v-card-title>
              Oooppppssssss!!!
            </v-card-title>

            <v-card-text>
              You are not eligible for a loan! Please try some other time
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="otherDialog.value = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
export default {
  middleware: 'logged',
  layout: 'default',
  data () {
      return {
        dialog: false,
        otherDialog: false,
        loading: false,
        loanInfo: {
          id: 10,
          First_name: '',
          Last_name: '',
          Dependents: '',
          ApplicantIncome: '',
          CoapplicantIncome: '',
          LoanAmount: '',
          Loan_Amount_Term: '',
          Credit_History: '',
          Married: '',
          Gender: '',
          Education: '',
          Self_Employed: '',
          Property_Area: ''
        },
        maritalStatus: 
          [
            {
            name: 'Single',
            value: 'No'
            },
            {
            name: 'Married',
            value: 'Yes'
            }
          ],
        dependants:
          [
            {
            name: '0',
            value: '0',
            },
            {
            name: '1',
            value: '1',
            },
            {
            name: '2',
            value: '2'
            },
            {
            name: '3',
            value: '3'
            },
            {
            name: '3+',
            value: '3+'
            }
          ],
        gender:
          [
            {
            name: 'Male',
            value: 'Male'
            },
            {
            name: 'Female',
            value: 'Female'
            }
          ],
        education:
          [
            {
            name: 'Graduate',
            value: 'Graduate'
            },
            {
            name: 'Undergraduate',
            value: 'Not Graduate'
            }
          ],
        employmentStatus: 
          [
            {
            name: 'Employed',
            value: 'No'
            },
            {
            name: 'Self Employed',
            value: 'Yes'
            }
          ],
          creditHisory: 
          [
            {
            name: 'Good',
            value: '1'
            },
            {
            name: 'Fair',
            value: '0'
            }
          ],
          propertyArea: 
          [
            {
            name: 'Urban',
            value: 'Urban'
            },
            {
            name: 'Rural',
            value: 'Rural'
            },
            {
            name: 'Semi Urban',
            value: 'Semiurban'
            }
          ]
        }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    async submitLoan(info) {
      this.loanInfo.Credit_History = parseInt(this.loanInfo.Credit_History)
      this.loanInfo.CoapplicantIncome = parseInt(this.loanInfo.CoapplicantIncome)
      this.loanInfo.ApplicantIncome = parseInt(this.loanInfo.ApplicantIncome)
      this.loanInfo.LoanAmount = parseInt(this.loanInfo.LoanAmount)
      
      this.loanInfo.Loan_Amount_Term = parseInt(this.loanInfo.Loan_Amount_Term)
      try {
        this.loading = true;
        const response = await this.$axios.post('/apply', info)
        this.$toast.success('You just checked your loan eligibility')
        if (response.data.eligible_for_loan) {
          this.dialog = true;
        } else {
          this.otherDialog = true;
        }
        // this.loanInfo = ''
        this.loading = false;
    } catch(error) {
        // this.loanInfo = ''
        this.loading = false
        this.$toast.success('There was a problem checking your loan eligibility, Check the input fields and try again.')
    }
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}

</script>
<style scoped>
.bigBack {
  background-color:#2F2E41;
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
.text-center {
  text-align: center;
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
  padding: 40px 100px;
  background-size: cover;
  background-repeat: no-repeat;
}
.loginPanel {
  background: rgba(255, 255, 255, 0.884);
  width: 600px;
  padding: 50px 20px;
  height: fit-content;
  border-radius: 20px;
}
.logBtn {
  margin-top: 30px;
  background-color: black !important;
  color:  white !important;
}
@media (max-width: 600px) {
  .header {
    padding: 10px !important;
  }
  .loginPanel {
    width: 90% !important;
  }
  .mainBack {
    padding: 10px 25px;
    align-items: flex-start;
    margin-top: 30px;
  }
}
</style>
