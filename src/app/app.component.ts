import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, EventSettingsModel, View, GroupModel, TimeScaleModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { roomData } from '../data';
declare var $: any;

interface Owner {
  OwnerText: string;
  Id: number;
  OwnerGroupId: number;
  OwnerColor: string;
}

interface Resource {
  RoomText: string;
  Id: number;
  RoomColor: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, WeekService, WorkWeekService, MonthService,
    AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]
})
export class AppComponent implements OnInit,AfterViewInit   {
  @ViewChild('scheduleObj', { static: false }) scheduleObj!: ScheduleComponent;

  user:string  = "";
  selectedUser: Owner | undefined
  ngOnInit(): void {
    $('div:not([class])').remove()
  }
  ngAfterViewInit() {
    if (this.scheduleObj) {
      this.scheduleObj.refresh();
    }
  }
  /* public selectedDate: Date = new Date();

  // Different views of calendar
  public views: Array<string> = ['Day', 'Week', 'Month'];


  public eventSettings: EventSettingsModel = {
    dataSource: [],
    resourceColorField: 'Roles'
  };


  public allowMultipleOwner: Boolean = true;
  public allowMultipleCategory: Boolean = true;
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };


  public group: GroupModel = {
    resources: ["Roles", "Owners"]
  };


  public roleDataSource: Object[] = [
    { RoleText: "Casual Labor", Id: 1, RoleColor: "#cb6bb2" },
    { RoleText: "Kitchen", Id: 2, RoleColor: "#56ca85" },
    { RoleText: "Manager", Id: 3, RoleColor: "#f8a398" },
    { RoleText: "Operations", Id: 4, RoleColor: "#ffaa00" },
    { RoleText: "Part time", Id: 5, RoleColor: "#7499e1" }
  ];


  // Users
  public ownerDataSource: Object[] = [
    { OwnerText: 'Arpit', Id: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
    { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
  ]; */

  selectedOwner: Owner | undefined;
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  public allowMultipleCategory: Boolean = true;
  public selectedDate: Date = new Date();
  public views: Array<string> = ["Day", "Week", "Month","TimelineDay"];
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2023, 5, 2, 10, 0),
        EndTime: new Date(2023, 5, 2, 12, 0),
        OwnerId: 1
      },
      {
        Id: 2,
        Subject: 'Conference',
        StartTime: new Date(2023, 5, 4, 14,0),
        EndTime: new Date(2023, 5, 5, 18, 0),
        OwnerId: 2
      },
      {
        Id: 3,
        Subject: 'Training',
        StartTime: new Date(2023, 5, 8, 9, 0),
        EndTime: new Date(2023, 5, 10, 11, 0),
        OwnerId: 1
      },
      // Add more schedules as needed
    ],
    resourceColorField: 'Rooms'
  };
  public group: GroupModel = {
    resources: ["Rooms", "Owners"]
  };
  public roomDataSource: Resource[] = [
    { RoomText: "Casual Labor", Id: 1, RoomColor: "#cb6bb2" },
    { RoomText: "Kitchen", Id: 2, RoomColor: "#56ca85" },
    { RoomText: "Manager", Id: 3, RoomColor: "#7499e1" },
    { RoomText: "Operations", Id: 4, RoomColor: "#f8a398" },
    { RoomText: "Part time", Id: 5, RoomColor: "#ffaa00" }
  ];
  public allowMultipleOwner: Boolean = true;
  public ownerDataSource: Owner[] = [
    { OwnerText: "Arpit", Id: 1, OwnerGroupId: 4, OwnerColor: "#ffaa00" },
    { OwnerText: "Steven", Id: 2, OwnerGroupId: 3, OwnerColor: "#f8a398" },
    { OwnerText: "Michael", Id: 3, OwnerGroupId: 4, OwnerColor: "#7499e1" }
  ];

  onScheduleCreated(args: { schedule: ScheduleComponent }): void {
    this.scheduleObj = args.schedule;
  }


  onUserSelect($event: any) {
    const selectedUserId = $event.target.value;
    const selectedOwner = this.ownerDataSource.find(owner => owner.Id === +selectedUserId);
    if (selectedOwner) {
      this.selectedOwner = selectedOwner;
      const selectedOwnerResources = [{
        OwnerId: selectedOwner.Id,
        OwnerText: selectedOwner.OwnerText,
        OwnerGroupId: selectedOwner.OwnerGroupId,
        OwnerColor: selectedOwner.OwnerColor
      }];
      this.eventSettings = {
        dataSource: selectedOwnerResources,
        resourceColorField: 'Owners'
      };
      if (this.scheduleObj) {
        this.scheduleObj.refresh();
      }
    }
  }

  openModal($event ? : any): void {
    const modal = document.getElementById('myModal');
    
    const openModalButton = document.getElementById('openModalButton');
    if(modal) modal.style.display = 'block';
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', function() {
      if(modal) {
        modal.style.display = 'none';
      }
    });
    this.onCloseInnerPopup();
  }
  addUser(): void {
    const modal = document.getElementById('exampleModal');
    if(modal) {
      modal.style.display = 'block';
      modal.style.opacity = "1";
      this.user = ""
    }
  }
  onUserSave() {
    const newOwner = {
      Id: this.ownerDataSource.length+1,
      OwnerText: this.user,
      OwnerColor: '',
      OwnerGroupId: 4
    }
    this.ownerDataSource.push(newOwner)
    this.selectedUser = newOwner
    this.scheduleObj.refresh();
    this.onCloseInnerPopup();

  }

  onCloseInnerPopup(){
    const exampleModal = document.getElementById('exampleModal');
    const innerCloseButton = document.getElementsByClassName('closeInner')[0];
    if(exampleModal) {
      exampleModal.style.display = 'none';
    }
  }
  
}


