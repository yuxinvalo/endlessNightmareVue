<template>
  <el-form ref="profileForm" :model="profileForm" :rules="profileRules">
    <el-form-item label="Name" prop='updateUsername'>
      <el-input v-model="profileForm.updateUsername" />
    </el-form-item>

    <el-form-item label="Age">
      <el-input v-model.trim="profileForm.updateAge" type="number" />
    </el-form-item>

    <el-form-item label="Sex">
      <el-select v-model.trim="profileForm.updateSex">
        <el-option label="Boy" value="M" />
        <el-option label="Girl" value="F" />
      </el-select>
    </el-form-item>

    <el-form-item label="Dream">
      <el-input type="text" v-model.trim="profileForm.updateDream" />
    </el-form-item>

    <el-form-item label="16 Personality">
      <el-select v-model.trim="profileForm.person16Choose">
        <el-option v-for="person in person16Select" :label="person.name" :value="person.name" :key="person.key">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Email" prop='updateEmail' >
      <el-input v-model.trim="profileForm.updateEmail" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { validEmail } from '@/utils/validate'
import { updateProfile } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          sex: '',
          age: 0,
          dream: '',
          person16: '',
          email: ''
        }
      }
    }
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)){
        callback(new Error('Please enter the correct email, or you can\'t find your password!'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      console.log(rule)
      console.log(value)
      if (!validUsername(value)) {
        callback(new Error('A username contains just number and letters, length must <= 4'))
      } else {
        callback()
      }
    }
    return {
      person16Select: [
        { name: 'INTJ-A / INTJ-T', key: 1 },
        { name: 'INTP-A / INTP-T', key: 2 },
        { name: 'INFP-A / INFP-T', key: 3 },
        { name: 'ENTJ-A / ENTJ-T', key: 4 },
        { name: 'ENTP-A / ENTP-T', key: 5 },
        { name: 'INFJ-A / INFJ-T', key: 6 },
        { name: 'ENFJ-A / ENFJ-T', key: 7 },
        { name: 'ENFP-A / ENFP-T', key: 8 },
        { name: 'ISTJ-A / ISTJ-T', key: 9 },
        { name: 'ISFJ-A / ISFJ-T', key: 10 },
        { name: 'ESFJ-A / ESFJ-T', key: 11 },
        { name: 'ESTJ-A / ESTJ-T', key: 12 },
        { name: 'ISTP-A / ISTP-T', key: 13 },
        { name: 'ISFP-A / ISFP-T', key: 14 },
        { name: 'ESTP-A / ESTP-T', key: 15 },
        { name: 'ESFP-A / ESFP-T', key: 16 }],
        profileForm: {
          person16Choose: this.user.person16,
          updateSex: this.user.sex,
          updateAge: this.user.age,
          updateDream: this.user.dream,
          updateEmail: this.user.email,
          updateUsername: this.user.name
        },
        profileRules: {
          // BUG: Rules can't be binded model value!!!!
          // RESOLVED: in fact, the prop with be binded with profileForm.xxx this xxx must be the name of rules
          updateEmail: [{ trigger: 'blur', validator: validateEmail }, { required: true, message: "Email is required!" }],
          updateUsername: [{ trigger: 'blur', validator: validateUsername }, { required: true, message: "Email is required!" }]
        }
    }
  },

  methods: {
    submit() {
      console.log(this.profileForm)

      this.$refs.profileForm.validate(valid => {
        if(valid) {
          const data = { "username": this.profileForm.updateUsername, "sex": this.profileForm.updateSex,
                         "age" : this.profileForm.updateAge, "dream": this.profileForm.updateDream,
                         "email" : this.profileForm.updateEmail, "person16" : this.profileForm.person16Choose}
          console.log("update profile : ")
          console.log(data)
          updateProfile(data).then(response => {
            if (response.code == 20000) {
              this.$message({
                message: 'User information has been updated successfully',
                type: 'success',
                duration: 5 * 1000
              })
              this.$router.go(0)
            }
          })
        }
      })

    }
  }
}
</script>
