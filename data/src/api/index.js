import axios from 'axios'
import URLs from "./URLs";

const transferData = axios.create({
    baseURL: 'http://47.98.147.88',
    // baseURL: 'http://127.0.0.1',
    method: 'get'
});


export default {
    queryAllStudent() {
        return transferData({
            url: URLs.queryAllStudent
        })
    },
    updateStudent(obj) {
        return transferData({
            url: URLs.updateStudent,
            params: {
                ...obj
            }
        })
    },
    delBySNo(sNo) {
        return transferData({
            url: URLs.delBySNo,
            params: {
                sNo,
            }
        })
    },
    addStudent(addStuObj) {
        return transferData({
            url: URLs.addStudent,
            params: {
                ...addStuObj
            }
        })
    },
    searchKeyWord(keyWord) {
        return transferData({
            url: URLs.searchKeyWord,
            params: {
                keyWord,
            }
        })
    }
};