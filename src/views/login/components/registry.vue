<template>
  <div class="registry-container">
    <div class="title-container">
      <h3 class="title">Registry Form</h3>
    </div>

    <el-form ref="registryForm" :model="registryForm" :rules="registryRules" label-width="120px">

      <el-form-item :label="translation.email" prop='email'>
        <el-input
          ref="email"
          v-model="registryForm.email"
          placeholder="Email"
          name="email"
          type="text"
        />
      </el-form-item>

      <el-form-item :label="translation.username" prop='username'>
        <el-input
          ref="username"
          v-model="registryForm.username"
          placeholder="Username"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item :label="translation.password" prop="password">

        <el-input
          :key="passwordType"
          ref="password"
          v-model="registryForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item :label="translation.confirmPassword" prop="passwordConfirm">
        <el-input
          :key="passwordType"
          ref="passwordConfirm"
          v-model="registryForm.passwordConfirm"
          :type="passwordType"
          placeholder="Password Confirmation"
          name="passwordConfirm"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button type="primary" @click="onRegistry">Registry</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { validEmail } from '@/utils/validate'
import { setAsSha } from '@/utils/index'
import { registryUser } from '@/api/user'

export default{
  name: 'Registry',
  props: {
	      showRegistry: {
	        type:Boolean,
          default: true
	      }
	    },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)){
        callback(new Error('Please enter the correct email'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('The password can not be less than 4 digits'))
      } else {
        if (this.registryForm.passwordConfirm != '' && value != this.registryForm.passwordConfirm){
          callback(new Error('The password confirmation failed'))
        } else {
          callback()
        }
      }
    }

    const validatePasswordConfirm = (rule, value, callback) => {
      if (value != this.registryForm.password) {
        callback(new Error('The password confirmation failed.'))
      } else {
        callback()
      }
    }
    return {
      registryForm:{
        email:'',
        username:'',
        password:'',
        passwordConfirm:''
      },
      registryRules: {
        email:[{ required: true, trigger: 'blur', validator: validateEmail }],
        username:[{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordConfirm: [{ required: true, trigger: 'blur', validator: validatePasswordConfirm }]
      },
      translation:{
        email:'Email',
        username:'Username',
        password: 'Password',
        confirmPassword:'Confirm Pwd'
      },
      passwordType: 'password',
      loading: false
    }

  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    onRegistry(){
      // console.log(this.registryForm)
      this.$refs.registryForm.validate(valid => {
        if(valid) {
          var secret = setAsSha(this.registryForm.password)

          const data = { "email" : this.registryForm.email,
                         "username" : this.registryForm.username,
                         "secret" : secret }
          console.log(data)
          this.loading = true
          registryUser(data).then(response => {
            if (response.code == 20000 && response.showMsg == true) {
              this.$emit('close')
              this.loading = false
            }
          })
        } else {
          console.log("Unknow error")
          return false
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
$bg:#000000;
$bgShadow:#2d3a4b;

.registry-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .el-form-item {
    background: $bg;
    color: #ffffff;
  }
  .el-form-item__label{
    color: #ffffff;
  }
  .el-form-item__content{
    background: $bgShadow;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .el-button{
    margin-left: 40%;
  }
}
</style>
