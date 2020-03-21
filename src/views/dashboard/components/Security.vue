<template>
  <div class="security-container">
  <el-form v-show="showChangePass" ref="changePassForm" :model="changePassForm" :rules="changePassRules">
    <el-form-item label="Original Password" prop="oldPass">
      <el-input :key="passwordType" :type="passwordType"
                v-model.trim="changePassForm.oldPass" />
    </el-form-item>

    <el-form-item label="Set New Password" prop="newPass">
      <el-input v-model.trim="changePassForm.newPass" />
    </el-form-item>

    <el-form-item label="Confirm New Password" prop="newPassConfirm">
      <el-input v-model.trim="changePassForm.newPassConfirm" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit" >Update Password</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancelChangePass" >Cancel</el-button>
    </el-form-item>
  </el-form>

  <el-form v-show="showChangePass==false">
    <el-form-item >
      <el-button type="primary" @click="onChangePass" >Change Passowrd</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
// TODO: Add eyes svg to password
import { setAsSha } from '@/utils/index'
import { changePass } from '@/api/user'
export default {
  name: 'Security',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('The password can not be less than 4 digits'))
      } else {
        callback()
      }
    }

    const validatePasswordConfirm = (rule, value, callback) => {
      if (value != this.changePassForm.newPass) {
        callback(new Error('The password confirmation failed.'))
      } else {
        callback()
      }
    }
    return {
      changePassForm:{
        oldPass: "",
        newPass: "",
        newPassConfirm: ""
      },
      changePassRules:{
        newPass: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newPassConfirm: [{ required: true, trigger: 'blur', validator: validatePasswordConfirm }],
        oldPass: [{ required: true, trigger:'blur', message: "Old password is required." }]
      },
      showChangePass: false,
      passwordType: 'password'
    }
  },
  methods: {
    onSubmit() {
      console.log("update password")
      this.$refs.changePassForm.validate(valid => {
        if(valid) {
          var secret = setAsSha(this.changePassForm.oldPass)
          var newSecret = setAsSha(this.changePassForm.newPass)

          const data = {"secret" : secret, "new_secret": newSecret}
          console.log(data)
          changePass(data).then(response => {
            if (response.code === 20000){
              this.changePassForm.oldPass = ""
              this.changePassForm.newPass = ""
              this.changePassForm.newPassConfirm = ""
              this.showChangePass = false
            }
          })
        }
      })
    },
    onChangePass() {
      console.log("change password")
      this.showChangePass = true
    },
    cancelChangePass(){
      this.changePassForm.oldPass = ""
      this.changePassForm.newPass = ""
      this.changePassForm.newPassConfirm = ""
      // Clear rules alert
      this.$refs.changePassForm.resetFields()
      this.showChangePass = false
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
