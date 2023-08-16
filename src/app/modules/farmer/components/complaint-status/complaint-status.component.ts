import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.scss']
})
export class ComplaintStatusComponent {

  complaints: {
    complaintTicketId: string;
    complainedFor: string;
    reason: string;
    status: string;
  }[] = [
      {
        complaintTicketId: 'COMTIC0000000000001',
        complainedFor: 'IBIZA VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
      {
        complaintTicketId: 'COMTIC0000000000002',
        complainedFor: 'REYES VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'READ'
      },
      {
        complaintTicketId: 'COMTIC0000000000003',
        complainedFor: 'CRUZ VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
      {
        complaintTicketId: 'COMTIC0000000000004',
        complainedFor: 'PAMILIHANG BAYAN VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'READ'
      },
      {
        complaintTicketId: 'COMTIC0000000000005',
        complainedFor: 'ASTRERO FRUIT WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
      {
        complaintTicketId: 'COMTIC0000000000006',
        complainedFor: 'TIANGCO VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'READ'
      },
      {
        complaintTicketId: 'COMTIC0000000000007',
        complainedFor: 'BENNY VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },

      {
        complaintTicketId: 'COMTIC0000000000008',
        complainedFor: 'IBIZA VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
      {
        complaintTicketId: 'COMTIC0000000000009',
        complainedFor: 'REYES VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'READ'
      },
      {
        complaintTicketId: 'COMTIC0000000000010',
        complainedFor: 'CRUZ VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
      {
        complaintTicketId: 'COMTIC0000000000011',
        complainedFor: 'PAMILIHANG BAYAN VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'READ'
      },
      {
        complaintTicketId: 'COMTIC0000000000012',
        complainedFor: 'ASTRERO FRUIT WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
      {
        complaintTicketId: 'COMTIC0000000000013',
        complainedFor: 'TIANGCO VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'READ'
      },
      {
        complaintTicketId: 'COMTIC0000000000014',
        complainedFor: 'BENNY VEGETABLE WHOLESALER',
        reason: 'They have sent the wrong item',
        status: 'UNREAD'
      },
    ]
}