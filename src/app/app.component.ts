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
  roomId?:number;
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
  selectedDepart:Number  = 0
  selectedUser: Owner | undefined
  
  ngOnInit(): void {
    this.updateEventDataSource()
    $('div:not([class])').remove()
  }
  ngAfterViewInit() {
    if (this.scheduleObj) {
      setTimeout(() => {
       

        this.scheduleObj.changeView('TimelineWeek');
        this.scheduleObj.refresh();
        
      },0)
    }
    // this.selectedDepart = this.roomDataSource[0].Id
    // this.selectedOwner = this.ownerDataSource[0]
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

  public OwnerMockData = [
    {
      Id: 1,
      Subject: 'Arpit',
      StartTime: new Date(2023, 5, 2, 10, 0),
      EndTime: new Date(2023, 5, 2, 12, 0),
      roomId: 1
    },
    {
      Id: 2,
      Subject: 'Steven',
      StartTime: new Date(2023, 5, 4, 14, 0),
      EndTime: new Date(2023, 5, 5, 18, 0),
      roomId: 2
    },
    {
      Id: 3,
      Subject: 'Michael',
      StartTime: new Date(2023, 5, 8, 9, 0),
      EndTime: new Date(2023, 5, 10, 11, 0),
      roomId: 3
    },
    {
      Id: 4,
      Subject: 'John',
      StartTime: new Date(2023, 5, 12, 13, 0),
      EndTime: new Date(2023, 5, 12, 15, 0),
      roomId: 1
    },
    {
      Id: 5,
      Subject: 'Sarah',
      StartTime: new Date(2023, 5, 15, 11, 0),
      EndTime: new Date(2023, 5, 15, 13, 0),
      roomId: 2
    },
    {
      Id: 6,
      Subject: 'David',
      StartTime: new Date(2023, 5, 18, 9, 0),
      EndTime: new Date(2023, 5, 18, 11, 0),
      roomId: 3
    },
    {
      Id: 7,
      Subject: 'Emily',
      StartTime: new Date(2023, 5, 22, 14, 0),
      EndTime: new Date(2023, 5, 22, 16, 0),
      roomId: 1
    },
    {
      Id: 8,
      Subject: 'Daniel',
      StartTime: new Date(2023, 5, 25, 12, 0),
      EndTime: new Date(2023, 5, 25, 14, 0),
      roomId: 2
    },
    {
      Id: 9,
      Subject: 'Olivia',
      StartTime: new Date(2023, 5, 28, 10, 0),
      EndTime: new Date(2023, 5, 28, 12, 0),
      roomId: 3
    },
    {
      Id: 10,
      Subject: 'Matthew',
      StartTime: new Date(2023, 5, 30, 16, 0),
      EndTime: new Date(2023, 5, 30, 18, 0),
      roomId: 1
    }
    // Add more entries as needed
  ];
  
  public RoomMockData = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 5, 2, 10, 0),
      EndTime: new Date(2023, 5, 2, 12, 0),
      OwnerId: 1,
      roomId:1
    },
    {
      Id: 2,
      Subject: 'Conference',
      StartTime: new Date(2023, 5, 4, 14,0),
      EndTime: new Date(2023, 5, 5, 18, 0),
      OwnerId: 2,
      roomId:2
    },
    {
      Id: 3,
      Subject: 'Training',
      StartTime: new Date(2023, 5, 8, 9, 0),
      EndTime: new Date(2023, 5, 10, 11, 0),
      OwnerId: 1,
      roomId:1
    },
    // Add more schedules as needed
  ]

  public viewShiftsBy: string = 'user';
  public selectedOwner: any = 'all';
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  public allowMultipleCategory: Boolean = true;
  public selectedDate: Date = new Date();
  public views: Array<string> = ["Day", "Week", "Month","TimelineDay"];
  public eventSettings: EventSettingsModel = {
    dataSource: [],
    resourceColorField: 'Rooms'
  };
  public group: GroupModel = {
    resources: ["Rooms", "Owners"]
  };
  public roomDataSource: Resource[] = [
    { RoomText: "Casual Labor", Id: 1, RoomColor: "#cb6bb2" },
    { RoomText: "Kitchen", Id: 2, RoomColor: "#56ca85"},
    { RoomText: "Manager", Id: 3, RoomColor: "#7499e1"},
    { RoomText: "Operations", Id: 4, RoomColor: "#f8a398"},
    { RoomText: "Part time", Id: 5, RoomColor: "#ffaa00"}
  ];
  public allowMultipleOwner: Boolean = true;
  public ownerDataSource: Owner[] = [
    { OwnerText: "Arpit", Id: 1, OwnerGroupId: 4, OwnerColor: "#ffaa00" },
    { OwnerText: "Steven", Id: 2, OwnerGroupId: 3, OwnerColor: "#f8a398" },
    { OwnerText: "Michael", Id: 3, OwnerGroupId: 4, OwnerColor: "#7499e1" },
    { OwnerText: "John", Id: 4, OwnerGroupId: 3, OwnerColor: "#56ca85" },
    { OwnerText: "Sarah", Id: 5, OwnerGroupId: 4, OwnerColor: "#cb6bb2" },
    { OwnerText: "David", Id: 6, OwnerGroupId: 3, OwnerColor: "#aabbcc" },
    { OwnerText: "Emily", Id: 7, OwnerGroupId: 4, OwnerColor: "#ddccbb" },
    { OwnerText: "Daniel", Id: 8, OwnerGroupId: 3, OwnerColor: "#8899aa" },
    { OwnerText: "Olivia", Id: 9, OwnerGroupId: 4, OwnerColor: "#ccddff" },
    { OwnerText: "Matthew", Id: 10, OwnerGroupId: 3, OwnerColor: "#99aabb" }
    // Add more entries as needed
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

  openModal(modelName: string): void {
    const modal = document.getElementById(modelName);
    if (modal) {
      modal.style.display = 'block';
    }
  
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  
    const closeDept = document.getElementsByClassName('closeDept')[0];
    closeDept.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  
    this.onCloseInnerPopup();
  }
  
  addUser(): void {
    const modal = document.getElementById('exampleModal');
    const addDepartmentModal = document.getElementById('addDepartmentModal');
  
    if (modal) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
      this.user = '';
    }
  
    if (addDepartmentModal) {
      addDepartmentModal.style.display = 'block';
      addDepartmentModal.style.opacity = '1';
      this.user = '';
    }
  }
  
  onUserSave(type: string) {
    if (type === 'user') {
      const newOwner = {
        Id: this.ownerDataSource.length + 1,
        OwnerText: this.user,
        OwnerColor: this.generateRandomColor(),
        OwnerGroupId: Number(this.selectedDepart)
      };
      this.ownerDataSource.push(newOwner);
      this.selectedUser = newOwner;
      this.scheduleObj.refresh();
      this.onCloseInnerPopup();
    } else if (type === 'dept') {
      const newOwner = {
        Id: this.roomDataSource.length + 1,
        RoomText: this.user,
        RoomColor: this.generateRandomColor()
      };
      this.roomDataSource.push(newOwner);
      this.scheduleObj.refresh();
      this.onCloseInnerPopup();
    }
  }
  
  onCloseInnerPopup() {
    const exampleModal = document.getElementById('exampleModal');
    const addDepartmentModal = document.getElementById('addDepartmentModal');
    const innerCloseButton = document.getElementsByClassName('closeInner')[0];
  
    if (exampleModal) {
      exampleModal.style.display = 'none';
    }
  
    if (addDepartmentModal) {
      addDepartmentModal.style.display = 'none';
    }
  }
  

  generateRandomColor(): string {
    const letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    const isUniqueColor: boolean = this.ownerDataSource.every((owner: Owner) => owner.OwnerColor !== color);
    if (!isUniqueColor) {
      return this.generateRandomColor();
    }
    return color;
  }

  updateEventDataSource(): void {
    // Modify the event data based on your requirements
   
    if (this.viewShiftsBy === 'department') {
      this.eventSettings.dataSource = this.OwnerMockData
    }else{
      this.eventSettings.dataSource = this.RoomMockData;
    }
    // Assign the updated data to eventSettings.dataSource
  }
  
  public getFilteredDataSource(): any {
    if (this.viewShiftsBy === 'department') {
      return this.roomDataSource;
      // Filter owner data source based on department logic
      // Return the filtered data source
    } else if (this.viewShiftsBy === 'user') {
      return this.ownerDataSource;
    }
    return this.ownerDataSource; // Return the original data source if no filter applied
  }

  get isUserView():boolean  {
    return this.viewShiftsBy == 'user'
  }

  onChange(newValue:any) {
    console.log(newValue);
    if (newValue === 'department') {
      this.scheduleObj.eventSettings.dataSource = this.OwnerMockData
    } else if (newValue === 'user') {
      this.scheduleObj.eventSettings.dataSource = this.RoomMockData
    }
}
  
}


