import { createStore } from 'redux'
// redux
export default createStore((state=[],action)=>{
    
    // return action.type='numadd' ? 2 : 1
    switch(action.type){
        case 'add_house': return [...new Set([action.obj,...state])]
        default: return state
    }
})
// var a={
//     type:'numadd',
// }
// console.log(store.getState())
