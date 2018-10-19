// import { param2Obj } from '@/utils'

const userMap = {
    admin: {
        roles: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: '张三'
    },
    editor: {
        roles: ['editor'],
        token: 'editor',
        introduction: '我是编辑',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: '李四'
    }
}

export default {
    loginByUsername: config => {
        const { account } = JSON.parse(config.body)
        return userMap[account]
    }
}
