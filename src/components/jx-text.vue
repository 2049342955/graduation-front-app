<style lang="scss" rel="stylesheet/scss">
</style>
<template>
    <span :style="_style">
        <slot name="icon" v-if="isShowIcon">
            <Icon :type="_icon"></Icon>
        </slot>
        {{text}}
        <slot></slot>
    </span>
</template>
<script>
  import Icon from './jx-icon';
  import Moment from 'moment';

  //import UtlNumber from '@hasaki-ui/hsk-sona/lib/number';
  //import UtlDom from '@hasaki-ui/hsk-sona/lib/dom';

  import _ from 'lodash';
  const TYPE = {
    RAW: "raw",
    MONEY: "money",
    DATE: "date",
    TIME: "time",
    DATETIME: "datetime",
    COMPANY: "company",
    ADDRESS: "address",
    PERSON: "person",
    PHONE: "phone",
    LANDLINE: "landline",
    EMAIL: "email"
  };
  const ICON = {
    DATE: 'calendar',
    TIME: 'time',
    DATETIME: 'date-time',
    COMPANY: 'company',
    ADDRESS: 'address',
    PERSON: 'personal',
    PHONE: 'phone',
    LANDLINE: 'landline',
    EMAIL: 'email'
  };
  const rawRender = function (str, dftValue) {
    return str || _.isBoolean(str) ? str + "" : dftValue;
  };
  const dataRender = function (date, fmt) {
    return _.isDate(date) ? Moment(date).format(fmt) : date;
  };
//  const moneyRender = function (str, number) {
//    return str ? UtlNumber.fmtMoney(str, number) : str;
//  };
  export default {
    name: 'CdText',
    components: {Icon},
    componentName: 'CdText',
    props: {
      data: {
        required: true
      },
      type: {
        type: String,
        default: 'raw'
      },
      dftValue: {
        type: String,
        default: ''
      },
      icon: String,
      isShowIcon: {
        type: Boolean,
        default: true
      },
      size: Number,
      color: String,
      render: Function,
      isTruncate: {
        type: Boolean,
        default: false
      },
      maxLength: Number,
      truncateSeparator: [String, RegExp],
      truncateOmission: String,
      moneyNumber: {
        type: Number,
        default: 2
      },
      moneyPrefix: {
        type: String,
        default: "¥"
      },
      moneyColor: {
        type: Array,
        default () {
          return ['#F34C50', '#01B224', '#2f80af'];
        }
      },
      isShowMoneyColor: {
        type: Boolean,
        default: true
      },
      dateFmt: String
    },
    computed: {
      text() {
        if (this.render) return this.render(this.data);
        let text;
        let fmt;
        switch (this.type) {
          case TYPE.MONEY:
            text = this.moneyPrefix + moneyRender(this.data, this.moneyNumber);
            break;
          case TYPE.DATETIME:
            fmt = this.dateFmt || 'YYYY-MM-DD HH:mm:ss';
            text = dataRender(this.data, fmt);
            break;
          case TYPE.TIME:
            fmt = this.dateFmt || 'HH:mm:ss';
            text = dataRender(this.data, fmt);
            break;
          case TYPE.DATE:
            fmt = this.dateFmt || 'YYYY-MM-DD';
            text = dataRender(this.data, fmt);
            break;
          default:
            text = rawRender(this.data, this.dftValue);
        }
        if (this.isTruncate) {
          let options = {};
          if (this.width >= 0) options.length = this.calculationLength(this.width);
          if (this.maxLength >= 0) options.length = this.maxLength;
          if (this.truncateSeparator) options.separator = this.truncateSeparator;
          if (this.truncateOmission) options.omission = this.truncateOmission;
          text = _.truncate(text, options);
        }

        return text;
      },
      _icon(){
        if (this.icon) return this.icon;
        for (let key of Object.keys(TYPE)) {
          if (TYPE[key] === this.type) {
            return ICON[key];
          }
        }
      },
      _style(){
        let style = {};
        if (this.isShowMoneyColor && this.type === TYPE.MONEY) {
          let money = this.data * 1;
          if (money) {
            let moneyColor = this.moneyColor;
            style.color = money < 0 ? moneyColor[0] : money === 0 ? moneyColor[1] : moneyColor[2];
          }
        }
        if (this.size) style.fontSize = this.size + "px";
        if (this.color) style.color = this.color;
        return style;
      }
    },
    methods: {
      calculationLength(width){
        //let style = UtlDom.getElementStyle(this.$el);
        let fontSize = style.fontSize;
        return width / fontSize | 0;
      }
    },
    TYPE
  };
</script>


