<style lang="scss" rel="stylesheet/scss" module>

  .item {
    &.text {
      [class*='el-form-item__label'] {
        color: orangered;
        font-size: x-small;
        vertical-align: bottom;
        padding-top: 2px;
        &:before {
          content: '';
        }
      }
    }
    &:hover {
      .edit-btn {
        opacity: 1;
      }
    }
  }

  .edit-btn {
    margin-left: 10px;
    opacity: 0;
    //transition: $base__transition;
  }

  .wrapper {
    position: relative;
  }

  .btn-box {
    position: absolute;
    right: 10px;
    top: 0;
    background-color: #fff;
    height: 80%;
    margin-top: 2px;
  }
</style>
<template>
  <el-form-item :label="label" :label-width="labelWidth" :prop="prop" :required="required"
                :rules="rules" :error="error" :inline-message="inlineMessage" ref="item"
                :class="[$style.item,{[$style.text]:!isEdit}]"
                :show-message="showMessage">
    <div :class="$style.wrapper"
         v-if="type === 'all' || type=== 'onlyEdit'"
         v-show=" type=== 'onlyEdit' || (type === 'all' && isEdit )">
      <slot>
      </slot>
    </div>

    <div :class="$style.wrapper"
         v-if="type === 'all' || type === 'onlyText'"
         v-show=" type === 'onlyText' || (type === 'all' && !isEdit  )">
      <slot name="text">
        <p :data="text" :type="textType"></p>
      </slot>
      <div :class="$style['btn-box']">
        <el-button type="text" :class="$style['edit-btn']" @click="handleEdit">
          <jx-icon type="update" tip="编辑"></jx-icon>
        </el-button>
      </div>
    </div>

  </el-form-item>
</template>
<script>
  import JxIcon from '../components/jx-icon.vue';
  import JxText from '../components/jx-text.vue';
  //import Base from '@hasaki-ui/hsk-jinx/lib/mixin/base';

  export default {
    name: 'TmEditableItem',
    componentName: 'TmEditableItem',
    components: {
      JxText, JxIcon
    },
    //mixins: [Base],
    props: {
      /**
       * 扩展
       */
      // onlyText,onlyEdit,all
      type: {
        type: String,
        default: 'all'
      },
      textType: String,
      initEditStatus: {
        type: Boolean,
        default: false
      },
      // 原有
      label: String,
      labelWidth: String,
      prop: String,
      required: {
        type: Boolean,
        default: undefined
      },
      rules: [Object, Array],
      error: String,
      inlineMessage: String,
      showMessage: {
        type: Boolean,
        default: undefined
      }
    },
    data() {
      return {
        oldValue: undefined
      };
    },
    computed: {
      text() {
        return this.elForm.model[this.prop];
      },
      elForm() {
        //return this._$findParent("ElForm");
      },
      editable() {
        //return this._$findParent("TmEditable");
      },
      isEdit() {
        return this.editable.value;
      }
    },
    created() {
    },
    methods: {
      handleEdit() {
        this.oldValue = this.elForm.model[this.prop];
        this.editable.edit();
      }
    },
    mounted() {
    }
  };
</script>
