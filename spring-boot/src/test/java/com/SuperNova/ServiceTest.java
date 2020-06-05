package com.SuperNova;

import com.SuperNova.model.Course;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.service.CourseService;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;

public class ServiceTest extends Tester {
    @Resource
    private CourseService courseService;
    @Resource
    private AssignmentService assignmentService;

    @Test
    public void test1(){
        Course course = courseService.findById(1);
        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test2(){
        String str = assignmentService.searchDoneStatus(1,"s001");
        System.out.println(str);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }
}
