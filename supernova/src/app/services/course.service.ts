import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Response } from '../models/generic-response';
import { Course } from '../models/course';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  requestURL = {
    my: '/api/searchMyCourses',
    other: '/api/searchOtherCourses',
    all: '/api/searchAllCourses',
    all_my: '/api/searchAllMyCourses',
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  getCourses(
    type: string,
    userId: string,
    pageIndex: number,
    pageSize: number
  ) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        u_id: userId,
        pageIndex: String(pageIndex),
        pageSize: String(pageSize),
      },
    });
    return this.http.get<
      Response<{
        courses: {
          list: Course[];
        };
        teachers: {
          list: User[];
        };
        total: number;
      }>
    >(this.requestURL[type], { params });
  }

  getMyCourseNames() {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
      },
    });
    return this.http.get<Response<{ courses: Course[]; type: string }>>(
      this.requestURL['all_my'],
      { params }
    );
  }

  joinCourse(courseId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        s_id: String(this.userService.getUser().u_id),
        c_id: String(courseId),
      },
    });
    return this.http.post<Response<{}>>('/api/joinCourse', params.toString(), {
      headers,
    });
  }

  changeCourse(course: Course) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        course: JSON.stringify(course),
      },
    });
    return this.http.put<Response<{}>>('/api/changeCourse', params);
  }

  deleteCourse(course: Course) {
    course['status'] = 0;
    return this.changeCourse(course);
  }

  publishCourse(course: Course) {
    course['status'] = 2;
    return this.changeCourse(course);
  }

  resumeCourse(course: Course) {
    return this.publishCourse(course);
  }
}
