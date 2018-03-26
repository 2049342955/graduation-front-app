<style lang="scss" rel="stylesheet/scss">
</style>
<template>
  <i :class="classes" :style="styles"></i>
</template>
<script>
  /**
   * Created by joyer on 17/9/13.
   * 图标组件
   * 阿里图标库项目名 jinx-icon(http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=442772)
   */
  import _ from 'lodash';
  const prefixCls = 'jx-icon';

  export default {
    name: 'JxIcon',
    components: {},
    componentName: 'JxIcon',
    props: {
      /**
       * * 图标的类型,值为对应的阿里图标库图标项目中的图标名字
       */
      type: String,
      /**
       * 图标大小,为一个数字
       */
      size: [Number, String],
      /**
       * 图标颜色,为一个css的color的值(十六进制,rgba()等)
       */
      color: String
    },
    computed: {
      classes () {
        return `${prefixCls} ${prefixCls}-${this.type}`;
      },
      styles () {
        let style = {};

        if (this.size) {
          style['font-size'] = _.isString(this.size) ? this.size : this.size+'px';
        }

        if (this.color) {
          style.color = this.color;
        }
        return style;
      }
    }
  };
</script>


