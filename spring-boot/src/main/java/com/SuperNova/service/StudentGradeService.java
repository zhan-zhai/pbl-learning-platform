package com.SuperNova.service;
import com.SuperNova.model.StudentGrade;
import com.SuperNova.core.Service;

import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
public interface StudentGradeService extends Service<StudentGrade> {
    /**
     * 获取教师评分(未评分则为空)
     * @param p_id
     * @param s_id
     * @return
     */
    String searchEvaluateByTeacher(int p_id, int s_id);

    /**
     * 获取学生总分
     * @param p_id
     * @param s_id
     * @return
     */
    String searchGrade(int p_id, int s_id);

}
