import { defineStore } from 'pinia'
import  type {themeType} from "@/type/type";

export const useStore = defineStore('useStore',  {
  state(){
    return {
      theme: "", // 主题
    }
  },
  actions: {
    setTheme(val: themeType){
        this.theme = val
    }
  }
})
