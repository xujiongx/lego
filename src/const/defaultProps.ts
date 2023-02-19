import _ from "lodash-es";

export interface CommonComponentProps {
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
  opacity: string;
  position: string;
  left: string;
  top: string;
  right: string;
  actionType: string;
  url: string;
}

export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: "",
  url: "",

  // size
  height: "",
  width: "318px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",

  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",

  // shadow adn opacity
  boxShadow: "0 0 0 #000",
  opacity: '1',

  //position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};

export const textDefaultProps: TextComponentProps = {
  // basic props  -  font styles
  text: "文本内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000",
  backgroundColor: "",
  ...commonDefaultProps,
};

export const textStylesPropsNames = _.without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
);

export const transformToComponentProps = (
  props: TextComponentProps
) => {
  return _.mapValues(props, (item) => {
    return {
      type: item.constructor as StringConstructor,
      default: item,
    };
  });
};
