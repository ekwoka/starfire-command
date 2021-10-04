import cls from 'cloud-local-storage';
require('dotenv').config()

export const getItem = async function(key){
    return await cls.getItem(key,process.env.CLS_KEY)
};

export const setItem = async function(key,value){
    return await cls.setItem(key,value,process.env.CLS_KEY)
};