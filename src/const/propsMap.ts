import { h, VNode } from "vue";
import { TextComponentProps } from "./defaultProps";

export interface PropToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  initalTransform?: (value: any) => any;
  updateTransform?: (value: any) => any;
  valueProp?: string;
  eventName?: string;
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

const fontFamilyArr = [
  {
    text: "无",
    value: "",
  },
  {
    text: "宋体",
    value: '"SimSun","STSong"',
  },
  {
    text: "黑体",
    value: '"SimHei","STHeiti"',
  },
  {
    text: "楷体",
    value: '"KaiTi","STKaiti"',
  },
  {
    text: "仿宋",
    value: '"FangSong","STKaiti"',
  },
];

const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: h("span", { style: { fontFamily: font.value } }, font.text),
  };
});

/**
 * 文本 a-input a-textarea
 * 数字 a-slider a-input-number
 * 几个文本之一 a-dropdown a-
 *paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;

    left: string;
  top: string;
 */
export const mapPropsToFrom: PropsToForms = {
  width:{
    text: "宽",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  height:{
    text: "高",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  paddingLeft:{
    text: "左内边距",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  paddingRight:{
    text: "右内边距",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  paddingTop:{
    text: "上内边距",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  paddingBottom:{
    text: "下内边距",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  left:{
    text: "左",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  top:{
    text: "顶",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  text: {
    text: "文本",
    component: "a-textarea",
    extraProps: {
      rows: 3,
    },
    updateTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: "字号",
    component: "a-input-number",
    initalTransform: (v: string) => parseInt(v),
    updateTransform: (v: string) => v + "px",
  },
  lineHeight: {
    text: "行高",
    component: "a-slider",
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    initalTransform: (v: string) => parseFloat(v),
    updateTransform: (v: string) => v.toString(),
  },
  textAlign: {
    component: "a-radio-group",
    subComponent: "a-radio-button",
    text: "对齐",
    options: [
      {
        text: "左",
        value: "left",
      },
      {
        text: "中",
        value: "center",
      },
      {
        text: "右",
        value: "right",
      },
    ],
    updateTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: "a-select",
    subComponent: "a-select-option",
    text: "字体",
    options: fontFamilyOptions,
  },
  opacity: {
    text: "透明度",
    component: "a-slider",
    extraProps: {
      min: 0,
      max: 100,
      step: 1,
      reverse: true,
    },
    initalTransform: (v: string) => parseFloat(v) * 100,
    updateTransform: (v: number) => (v / 100).toString(),
  },
};
