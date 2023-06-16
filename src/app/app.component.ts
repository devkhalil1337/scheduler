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
    dataSource: [],
    resourceColorField: 'Rooms'
  };
  public group: GroupModel = {
    resources: ["Rooms", "Owners"]
  };
  public roomDataSource: Object[] = [
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
    console.log({args})
    this.scheduleObj = args.schedule;
  }


  onUserSelect($event: any) {
    const selectedUserId = $event.target.value;
    const selectedOwner = this.ownerDataSource.find(owner => owner.Id === +selectedUserId);
    if (selectedOwner) {
      // Update the selected owner in the Schedule component
      this.selectedOwner = selectedOwner;
  
      // Create a new resource collection with only the selected owner
      const selectedOwnerResources = [{
        OwnerId: selectedOwner.Id,
        OwnerText: selectedOwner.OwnerText,
        OwnerGroupId: selectedOwner.OwnerGroupId,
        OwnerColor: selectedOwner.OwnerColor
      }];
  
      // Update the resourceSettings in the Schedule component
      this.eventSettings = {
        dataSource: selectedOwnerResources,
        resourceColorField: 'Owners'
      };
  
      // Refresh the Schedule component
      if (this.scheduleObj) {
        this.scheduleObj.refresh();
      }
    }
  }
  
}


