import { Module } from "vuex";
import { GlobalDataProps } from ".";
import { v4 as uuidv4 } from "uuid";
import { TextComponentProps } from "@/const/defaultProps";
import _ from "lodash";

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

export interface ComponentData {
  props: TextComponentProps;
  id: string;
  name: string;
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello1",
      fontSize: "20px",
      fontWeight: "bold",
      top: "",
      fontFamily: "",
      fontStyle: "",
      textDecoration: "",
      lineHeight: "1",
      textAlign: "left",
      color: "red",
      backgroundColor: "",
      actionType: "",
      url: "",
      height: "",
      width: "",
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      borderStyle: "",
      borderColor: "",
      borderWidth: "",
      borderRadius: "",
      boxShadow: "",
      opacity: "",
      position: "",
      left: "",
      right: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello2",
      fontSize: "15px",
      fontWeight: "bold",
      top: "",
      fontFamily: "",
      fontStyle: "",
      textDecoration: "",
      lineHeight: "1",
      textAlign: "center",
      color: "green",
      backgroundColor: "",
      actionType: "",
      url: "",
      height: "",
      width: "",
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      borderStyle: "",
      borderColor: "",
      borderWidth: "",
      borderRadius: "",
      boxShadow: "",
      opacity: "",
      position: "",
      left: "",
      right: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello3",
      fontSize: "12px",
      fontWeight: "bold",
      top: "",
      fontFamily: "",
      fontStyle: "",
      textDecoration: "",
      lineHeight: "",
      textAlign: "",
      color: "",
      backgroundColor: "",
      height: "",
      width: "",
      paddingLeft: "",
      paddingRight: "",
      paddingTop: "",
      paddingBottom: "",
      borderStyle: "",
      borderColor: "",
      borderWidth: "",
      borderRadius: "",
      boxShadow: "",
      opacity: "",
      position: "",
      left: "",
      right: "",
      actionType: "url",
      url: "https://www.baidu.com",
    },
  },
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    add: (state, props: TextComponentProps) => {
      state.components.push({
        id: uuidv4(),
        name: "l-text",
        props,
      });
    },
    delete: (state, props) => {
      const deleteIndex = _.findIndex(
        state.components,
        (item) => item.id === props.id
      );
      state.components.splice(deleteIndex, 1);
      console.log(state.components);
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    update: (state, { key, value }) => {
      const curindex = _.findIndex(
        state.components,
        (item) => item.id === state.currentElement
      );
      state.components[curindex]["props"][key as keyof TextComponentProps] =
        value;
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find(
        (component) => component.id === state.currentElement
      );
    },
  },
};

export default editor;
