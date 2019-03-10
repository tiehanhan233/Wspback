import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/graphql',
    timeout: 1000
});


export default ({query,variables,operationName})=>{
    if (!variables){
        variables = {};
    }
    if (!operationName){
        operationName = null;
    }
    return instance.post('',{operationName,variables,query});
};
