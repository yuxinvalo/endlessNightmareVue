<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item :label="translation.title">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item :label="translation.classification">
        <el-select v-model="form.classification" placeholder="please select your zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item :label="translation.occured_time">
        <el-col :span="11">
          <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <!--el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col-->
      </el-form-item>
      <el-form-item :label="translation.psbtags">
        <el-button type="primary" @click="onAddTag(ele.value)" v-for="ele in selectedTags" :key="ele.key"> {{ele.value}} </el-button>
      </el-form-item>
      <el-form-item :label="translation.tags">
        <tags-input element-id="tags" :add-tags-on-space="true" :add-tags-on-comma="true"
          v-model="form.tags"></tags-input>
      </el-form-item>

      <el-form-item label="Privacy">
        <el-switch v-model="form.private" />
      </el-form-item>
      <!--el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item-->

      <el-form-item :label="translation.story">
          <tinymce v-model="form.desc" :height="300" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>


    <div>
    Synthese:</br>
    dream title: {{form.name}}</br>
    Level: {{form.classification}}</br>
    Occur time: {{form.date}}</br>
    Tags: {{form.tags}}</br>
    Private:{{form.private}}</br>
    Story: {{form.desc}}</br>
    </div>
  </div>




</template>

<script>
import tagsInput from './components/tagsInput'
import Tinymce from '@/components/Tinymce'
export default {
  components: { tagsInput, Tinymce },
  data() {
    return {
      form: {
        name: '',
        classification: '',
        date1: '',
        date2: '',
        private: false,
        tags: [],
        resource: '',
        desc: ''
      },
      translation: {
        title: 'Dream Title',
        classification: 'Level',
        occured_time: 'Occured at',
        psbtags:'Possible tags',
        tags: 'Tags',
        story: 'Main Story'
      },
      selectedTags: [
            { key: 1, value: 'despression' },
            { key: 2, value: 'painful' },
            { key: 3, value: 'monster' },
        ],
      keyTag: 1
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    onAddTag(val){
      console.log(val),
      console.log(this.keyTag),
      this.form.tags.push( {key:this.keyTag, value:val} ),
      this.keyTag = this.keyTag + 1
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.editor-content{
  margin-top: 20px;
}
</style>
