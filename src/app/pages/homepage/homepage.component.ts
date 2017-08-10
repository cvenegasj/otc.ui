import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdSidenav } from '@angular/material';
import { FormControl } from '@angular/forms';

import { AgmInfoWindow, MapsAPILoader } from '@agm/core';

import { SidenavService } from '../../services/sidenav.service';
import { DateoService } from '../../services/dateo.service';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { HomepageSharedService } from './homepage-shared.service';
import { AddDateoComponent } from '../../add-dateo/add-dateo.component';
import { AddProjectComponent } from '../../add-project/add-project.component';
import { LoginComponent } from '../../login/login.component';
import { Dateo } from '../../models/dateo';
import { Project } from '../../models/project';

declare const google: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ]
})
export class HomepageComponent implements OnInit {

  // initial center position for the map for Lima(San Isidro)
  lat: number = -12.0990427;
  lng: number = -77.0352271;
  zoom = 14;

  // initial center position for the map for Trujillo
  /*lat: number = -8.131797;
  lng: number = -79.039533;
  zoom = 14;*/

  markerUser: Marker;
  selectedProject: Project;
  selectedDateo: Dateo;
  isInfoPanelVisible = false;
  dateos: Dateo[] = [];
  projects: Project[] = [];

  projectsAll: Project[] = [];
  projectsOccupied: Project[] = [];
  projectsToBeOccupied: Project[] = [];
  projectsInConflict: Project[] = [];

  watchOcuppied = true;
  watchToBeOccupied = true;
  watchInConflict = true;

  mapsSearchControl = new FormControl();

  @ViewChild('leftSidenav') leftSidenav: MdSidenav;
  @ViewChild('mapsSearch') mapsSearchElementRef: ElementRef;
  @ViewChild('userInfoWindow') userInfoWindowElementRef: AgmInfoWindow;

  constructor(
    private sidenavService: SidenavService,
    private homepageSharedService: HomepageSharedService,
    private dateoService: DateoService,
    private projectService: ProjectService,
    private authService: AuthService,
    public dialog: MdDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.markerUser = { lat: this.lat, lng: this.lng };
    // store sidenav to service
    this.sidenavService.setSidenav(this.leftSidenav);
    // set current position
    this.setUserCurrentPosition();
    // load all dateos
    this.dateoService.getDateos().then(dateos => this.dateos = dateos);
    this.projectService.getProjects().then(projects => {
      this.projectsAll = this.projects = projects;
      this.projectsOccupied = this.projectsAll.filter(project => project.isOccupied);
      this.projectsToBeOccupied = this.projectsAll.filter(project => project.isToBeOccupied);
      this.projectsInConflict = this.projectsAll.filter(project => project.isInConflict);
    });
    this.homepageSharedService.selectedDateo$.subscribe(dateo => { this.selectedDateo = dateo; });
    this.homepageSharedService.isInfoPanelVisible$.subscribe(isInfoPanelVisible => { this.isInfoPanelVisible = isInfoPanelVisible; });
  }

  loadMapAPIs(event: any) {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.mapsSearchElementRef.nativeElement, {
        // types: ['address'] -- do not specify any type to get all addresses, establishments and geocodes
      });

      // adds a marker as result of the google maps search
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          // let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const place = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // move the center of the map
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;

          this.markerUser = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          this.userInfoWindowElementRef.open();
        });
      });
    });
  }

  setUserCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.lat = position.coords.latitude;
        // this.lng = position.coords.longitude;
        // this.zoom = 15;

        this.markerUser = { lat: position.coords.latitude, lng: position.coords.longitude };
      });
    }
  }

  // update user marker coords
  markerUserDragEnd($event: any) {
    console.log('dragEnd', $event.coords.lat, $event.coords.lng);
    this.markerUser.lat = $event.coords.lat;
    this.markerUser.lng = $event.coords.lng;
  }

  showAll() {
    this.watchOcuppied = true;
    this.watchToBeOccupied = true;
    this.watchInConflict = true;
    this.projects = this.projectsAll;
  }

  showOccupied() {
    this.watchOcuppied = true;
    this.watchToBeOccupied = false;
    this.watchInConflict = false;
    this.projects = this.projectsOccupied;
  }

  showToBeOccupied() {
    this.watchToBeOccupied = true;
    this.watchOcuppied = false;
    this.watchInConflict = false;
    this.projects = this.projectsToBeOccupied;
  }

  showInConflict() {
    this.watchInConflict = true;
    this.watchToBeOccupied = false;
    this.watchOcuppied = false;
    this.projects = this.projectsInConflict;
  }


  // ========== Click events from map markers ==========

  clickedDateoMarker(d: Dateo) {
    this.selectedDateo = d;
    this.router.navigate(['/home/dateos', d.idDateo]);
    this.homepageSharedService.setIsInfoPanelVisible(true);
  }

  clickedProjectMarker(p: Project) {
    this.selectedProject = p;
    this.router.navigate(['/home/proyectos', p.idProject]);
    this.homepageSharedService.setIsInfoPanelVisible(true);
  }


  // ========== Dialogs ==========

  openAddOcupaDialog() {
    if (!this.authService.isLoggedIn())  {
      this.dialog.open(LoginComponent);
      return;
    }

    const dialog = this.dialog.open(AddDateoComponent);
    // on form submit
    dialog.afterClosed()
      .subscribe(data => {
        if (data) { // validate data
          const newDateo = new Dateo();
          newDateo.address = data.address;
          newDateo.description = data.description;
          newDateo.latitude = this.markerUser.lat.toString();
          newDateo.longitude = this.markerUser.lng.toString();
          newDateo.userEmail = this.authService.getUsername();

          console.log(newDateo);
          this.createDateo(newDateo);
        }
      });
  }

  openAddProjectDialog() {
    if (!this.authService.isLoggedIn())  {
      this.dialog.open(LoginComponent);
      return;
    }

    const dialog = this.dialog.open(AddProjectComponent);
    // on form submit
    dialog.afterClosed()
      .subscribe(data => {
        if (data) { // validate data
          // console.log(data);
          const newProject = new Project();
          newProject.address = data.address;
          newProject.name = data.name;
          newProject.description = data.description;
          newProject.isOccupied = data.isOccupied;
          newProject.isToBeOccupied = data.isToBeOccupied;
          newProject.isInConflict = data.isInConflict;
          newProject.intervenedSpace = data.intervenedSpace;
          newProject.area = data.area;
          newProject.startPeriod = data.startPeriod.getDate() + '-' +
            (data.startPeriod.getMonth() + 1) + '-' + data.startPeriod.getFullYear(); // 0-based months in javascript
          newProject.endPeriod = data.endPeriod.getDate() + '-' +
            (data.endPeriod.getMonth() + 1) + '-' + data.endPeriod.getFullYear();
          newProject.inaugurationDate = data.inaugurationDate.getDate() + '-' +
            (data.inaugurationDate.getMonth() + 1) + '-' + data.inaugurationDate.getFullYear();
          newProject.elements = data.elements;
          newProject.execution = data.execution;
          newProject.donations = data.donations;
          newProject.materials = data.materials;
          newProject.photoUrl = data.photoUrl;
          newProject.processDescription = data.processDescription;
          newProject.latitude = this.markerUser.lat.toString();
          newProject.longitude = this.markerUser.lng.toString();
          newProject.userEmail = this.authService.getUsername();

          this.createProject(newProject);
        }
      });
  }

  // ========== Calls to services ==========

  createDateo(dateo: Dateo): void {
    this.dateoService.createDateo(dateo)
      .then(createdDateo => {
        console.log('saved!');
        console.log(createdDateo);
        this.dateos.push(createdDateo);
        this.selectedDateo = createdDateo;
        this.router.navigate(['/home/dateos', createdDateo.idDateo]);
        this.homepageSharedService.setIsInfoPanelVisible(true);
      });
  }

  createProject(project: Project): void {
    this.projectService.createProject(project)
      .then(createdProject => {
        console.log('saved!');
        console.log(createdProject);
        this.projects.push(createdProject);
        this.selectedProject = createdProject;
        this.router.navigate(['/home/proyectos', createdProject.idProject]);
        this.homepageSharedService.setIsInfoPanelVisible(true);
      });
  }

}

interface Marker {
  lat: number;
  lng: number;
  idProject?: number;
  type?: string;
  iconUrl?: string;
}
