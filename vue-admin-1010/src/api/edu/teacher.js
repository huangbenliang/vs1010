import request from '@/utils/request'

export default {
    //分页查询teacher
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            data: teacherQuery
        })
    },
    deleteTeacherById(id) {
        return request({
            url: `/eduservice/edu-teacher/${id}`,
            method: 'delete'
        })
    },
    addTeacher(teacher) {
        return request({
            url: `/eduservice/edu-teacher/save`,
            method: 'post',
            data: teacher
        })
    }

}