import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  courses: {
    course_id: string,
    course_name: string,
    description: string,
    duration_in_days: number
  }[] = [
      {
        course_id: 'CRSE202308000000000001',
        course_name: 'Master Computers - From Beginner to Expert in One Week',
        description: 'Enroll in this course and benefit from the expertise of a top-rated instructor with over two decades of experience in teaching individuals of varying skill levels. Acquire highly valuable hands-on computer skills that are essential in todays world. Enjoy the advantage of lifetime access to the course, allowing you to conveniently revisit materials and continually expand your knowledge. Rest assured with our Money Back Guarantee, ensuring your satisfaction or a full refund. From mastering the basics to delving into the most advanced features, this comprehensive course encompasses all the necessary knowledge for proficient computer usage. Through meticulously crafted video lectures, you will be guided visually through every computer-related task. Upon completion of the course, you will possess a thorough and confident grasp of effective computer utilization.',
        duration_in_days: 7
      },
      {
        course_id: 'CRSE202308000000000002',
        course_name: 'Microsoft Office Essential Skills',
        description: 'This course empowers you to navigate Microsoft Office with confidence within a professional setting. You will not only gain proficiency in the suite but also learn to implement best practices that enhance your work quality. By acquiring a comprehensive grasp of essential skills in applications like Word, Outlook, Excel, and PowerPoint, you will align with the expectations of employers. Through dedicated practice, you will not only achieve mastery but also boost your job satisfaction, fostering a sense of accomplishment in your workplace endeavors.',
        duration_in_days: 30
      }
    ]
}
