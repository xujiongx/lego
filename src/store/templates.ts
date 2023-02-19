import { Module } from "vuex";
import { GlobalDataProps } from ".";

 export interface Template {
  id: number;
  title: string;
  coverImage: string;
  author: string;
  copiedCount: number;
}

const testData: Template[] = [
  {
    id: 1,
    title: "111",
    coverImage:
      "https://img1.baidu.com/it/u=1155925829,983927803&fm=253&fmt=auto&app=138&f=JPEG?w=406&h=570",
    author: "xujiong",
    copiedCount: 1,
  },
  {
    id: 2,
    title: "222",
    coverImage:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fphoto%2Fl%2Fpublic%2Fp2511348658.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679153448&t=cdb33717b156668ae1686cba77f24bfc",
    author: "liuli",
    copiedCount: 1,
  },
];

export interface TemplatesProps {
  data: Template[];
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData,
  },
  getters: {
    getTemplateById: (state, getters, rootState) => (id: number) => {
      console.log(rootState.user.data.userName);
      return state.data.find((t) => t.id === id);
    },
  },
};

export default templates