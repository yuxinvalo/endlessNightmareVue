<template>
  <div class="app-container">
    <!-- <el-form-item :label="translation.title">
      <el-input v-model="classification.title" />
    </el-form-item> -->
    <el-form ref="form" :model="classification" label-width="120px">
      <div>
      <el-form-item :label="translation.title" class="classification-title">
        <el-input v-model="classification.title" />
      </el-form-item>
      </div>
      <hr class="title-hr">
      <div v-for="(ele, index) in classification.degree">
        <el-form-item :label="translation.degree_code">
          <el-input v-model="classification.degree[index].degree_code" />
        </el-form-item>

        <el-form-item :label="translation.desc">
          <el-input v-model="classification.degree[index].desc" />
        </el-form-item>

        <el-form-item :label="translation.possible_tags">
          <tags-input element-id="tags" :add-tags-on-space="true" :add-tags-on-comma="true"
                      :allow-duplicates="false" :existing-tags="classification.degree[index].possible_tags"
                      v-model="classification.degree[index].possible_tags"></tags-input>
        </el-form-item>
        <el-button type="primary" @click="deleteLevel(index)">
          Delete
        </el-button>
        <hr class="level-hr">
      </div>
    </el-form>

    <el-button class="add-one" @click="addLevel" :disabled="addActive">
      <span class="svg-container">
        <i class="el-icon-circle-plus-outline" />
      </span>
    </el-button>
    <el-button type="primary" @click="onSubmitClassification"> Save </el-button>
  </div>
</template>

<script>
import tagsInput from '../dreams/components/tagsInput'
import { getClassification, updateClassification } from '@/api/classification'
import { MessageBox, Message } from 'element-ui'
export default{
  components:{tagsInput},
  //name: 'classification',
  data() {
    return {
      classification: {
        title: "",
        degree:[
          {degree_code: 'A', desc: 'Description of degree A',
          possible_tags:[{ key: 1, value: 'tagAA' }, { key: 2, value: 'tagAB' }]},
          {degree_code: 'B', desc: 'Decription of degree B',
          possible_tags:[{ key: 1, value: 'tagBA' }, { key: 2, value: 'tagBB' }]}
        ]
      },
      translation: {
        degree_code:'Level',
        desc: 'Description',
        possible_tags: 'Tags',
        title: 'Title'
      },
      addActive: false
    }
  },
  mounted() {
      console.log("Fetch classification ... ")
      getClassification().then(response => {
        console.log(response)
        if (response.code === 20000){
          this.classification.title = response.data.title
          this.classification.degree = response.data.degree
          if (this.classification.title == 'default'){
            MessageBox.confirm('We advise that you set a personal classification to use statistics functions!', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            })
          }
        }
      })
  },

  methods:{
    addLevel() {
      if (this.classification.degree.length > 8) {
        MessageBox.confirm('Max classification level is 7! You can not add level anymore!', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        this.addActive = true
      } else {
        this.classification.degree.push({ degree_code:'', desc:'', possible_tags:[] })
      }
    },
    deleteLevel(index) {
      this.classification.degree.splice(index, 1)
      if (this.classification.degree.length < 7) {
        this.addActive = false
      }
      // console.log('deleted:', JSON.stringify(this.classification))
    },
    onSubmitClassification() {
      if (this.classification.degree.length > 8) {
        Message({
          message: 'Too many levels, please refine it!',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        console.log("update classification: " + JSON.stringify(this.classification))
        updateClassification(this.classification).then(response => {
          console.log(response)
          if (response.code === 20000){
            this.$router.go(0)
          }
        })
        // this.$route.go(0)
      }
    }

  }
}
</script>

<style scoped>
.add-one {
    display: block;
    padding: 10px 10px 10px 10px;
    margin-left: 96%;
}

.classification-title {
  padding: 10px 10px;
  margin: 10px 10px;
}

.title-hr{
  width:80%;
  margin:20px;
  border: 0;
  height: 4px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
.level-hr{
  height:1px;
  border:none;
  border-top:1px dashed;
  width: 70%;
  margin-bottom: 50px;
  margin-left: 0px;
}
</style>
