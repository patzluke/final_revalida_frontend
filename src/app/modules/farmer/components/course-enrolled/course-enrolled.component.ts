import { Component } from '@angular/core';

@Component({
  selector: 'app-course-enrolled',
  templateUrl: './course-enrolled.component.html',
  styleUrls: ['./course-enrolled.component.scss']
})
export class CourseEnrolledComponent {

  currentPage: number = 1;
  itemsPerPage: number = 4; // Number of items to show per page

  // Function to calculate the starting index of items for the current page
  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Function to calculate the ending index of items for the current page
  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  // Function to change the current page
  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  courses: {
    enrollment_id: string,
    user_id: string,
    course_id: string,
    enrollment_date: string,
    end_of_enrollment: string
  }[] = [
      {
        enrollment_id: 'ENRID202308160000000000001',
        user_id: 'USRID202308160000000000001',
        course_id: 'CRSEID202308160000000000001',
        enrollment_date: '2023-08-16 10:30:00 AM',
        end_of_enrollment: '2023-08-25 10:30:00 AM'
      },
      {
        enrollment_id: 'ENRID202308160000000000001',
        user_id: 'USRID202308160000000000001',
        course_id: 'CRSEID202308160000000000001',
        enrollment_date: '2023-08-16 10:30:00 AM',
        end_of_enrollment: '2023-08-25 10:30:00 AM'
      },
      {
        enrollment_id: 'ENRID202308160000000000001',
        user_id: 'USRID202308160000000000001',
        course_id: 'CRSEID202308160000000000001',
        enrollment_date: '2023-08-16 10:30:00 AM',
        end_of_enrollment: '2023-08-25 10:30:00 AM'
      },
      {
        enrollment_id: 'ENRID202308160000000000001',
        user_id: 'USRID202308160000000000001',
        course_id: 'CRSEID202308160000000000001',
        enrollment_date: '2023-08-16 10:30:00 AM',
        end_of_enrollment: '2023-08-25 10:30:00 AM'
      },
      {
        enrollment_id: 'ENRID202308160000000000001',
        user_id: 'USRID202308160000000000001',
        course_id: 'CRSEID202308160000000000001',
        enrollment_date: '2023-08-16 10:30:00 AM',
        end_of_enrollment: '2023-08-25 10:30:00 AM'
      },
      {
        enrollment_id: 'ENRID202308160000000000001',
        user_id: 'USRID202308160000000000001',
        course_id: 'CRSEID202308160000000000001',
        enrollment_date: '2023-08-16 10:30:00 AM',
        end_of_enrollment: '2023-08-25 10:30:00 AM'
      },
    ]
}
