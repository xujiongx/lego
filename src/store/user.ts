import { Module } from "vuex";
import { GlobalDataProps } from ".";

interface User {
  isLogin: boolean;
  userName?: string;
}

export interface UserProps {
  data: User;
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    data: {
      isLogin: false,
      userName: "",
    },
  },
  mutations: {
    login(state) {
      state.data = { ...state.data, isLogin: true, userName: "徐炯" };
    },
    logout(state) {
      state.data = { ...state.data, isLogin: false, userName: "" };
    },
  },
};

export default user;
