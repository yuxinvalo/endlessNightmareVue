<template>
  <div class="dashboard-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">

              <!--el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane-->
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="Security" name="security">
                <security />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Security from './components/Security'
//import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Dashboard',
  components:{UserCard, Account, Security},
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  created() {
    this.getUser()
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'role',
      'email',
      'age',
      'sex',
      'dream',
      'person16'
    ])
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        role: this.role,
        age: this.age,
        dream: this.dream,
        person16: this.person16,
        sex: this.sex
      }
      console.log(this.user)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
