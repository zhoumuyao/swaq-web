import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  // 在identity0和1页面选择的操作员列表
  const selected_LabsPeople = ref([])
  const selected_DissectPeople = ref([])

  //判断是否存在染病个体
  const infectedIndividual = ref(false)
  function increment() {
    count.value++
  }
  // 在identity0和1页面选择的操作员列表
  function addLabsPeople(data) {
    selected_LabsPeople.value = data
  }

  function addDissectPeople(data) {
    selected_DissectPeople.value = data
  }

  return { count, doubleCount, increment,selected_LabsPeople, selected_DissectPeople, addLabsPeople, addDissectPeople, infectedIndividual }
})
