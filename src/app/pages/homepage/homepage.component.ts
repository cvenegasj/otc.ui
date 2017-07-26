import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MdSidenav } from '@angular/material';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { SidenavService } from '../../shared/sidenav.service';
import { ProjectDetailComponent } from '../../project/project-detail.component';
import { Project } from '../../project/project';
import { ProjectService } from '../../shared/project.service';
import { HomepageSharedService } from './homepage-shared.service';

declare const google: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ],
  providers: [ HomepageSharedService ]
})
export class HomepageComponent implements OnInit {

  // initial center position for the map for Lima(San Isidro)
  //lat: number = -12.0990427;
  //lng: number = -77.0352271;
  //zoom: number = 13;

  // initial center position for the map for Trujillo
  lat: number = -8.131797;
  lng: number = -79.039533;
  zoom: number = 14;

  // markers for Lima
  /*markers: Marker[] = [
    {
      lat: -12.100167,
      lng: -77.034505,
      label: 'A'
    },
    {
      lat: -12.104637,
      lng: -77.040792,
      label: 'B'
    },
    {
      lat: -12.112418,
      lng: -77.043710,
      label: 'C'
    }
  ]; */

  // markers for Trujillo
  markers: Marker[] = [
    {
      lat: -8.127571,
      lng: -79.035471,
      idProject: 21,
      type: 'ocupado',
      iconUrl: 'ocupado-marker.svg'
    },
    {
      lat: -8.129322,
      lng: -79.040838,
      idProject: 22,
      type: 'por-ocupar',
      iconUrl: 'por-ocupar-marker.svg',
    },
    {
      lat: -8.124446,
      lng: -79.036797,
      idProject: 23,
      type: 'en-conclicto',
      iconUrl: 'en-conflicto-marker.svg'
    },
    {
      lat: -8.125446,
      lng: -79.037797,
      idProject: 23,
      type: 'ocupado',
      iconUrl: 'ocupado-marker.svg'
    },
    {
      lat: -8.124546,
      lng: -79.038707,
      idProject: 23,
      type: 'en-conclicto',
      iconUrl: 'en-conflicto-marker.svg'
    },
    {
      lat: -8.124666,
      lng: -79.039999,
      idProject: 23,
      type: 'por-ocupar',
      iconUrl: 'por-ocupar-marker.svg'
    }
  ];
  markerDatea: Marker;
  // markerCurrentPosition: Marker;
  selectedMarker: Marker;
  selectedProject: Project;

  mapsSearchControl = new FormControl();

  @ViewChild('leftSidenav') public leftSidenav: MdSidenav;
  @ViewChild('mapsSearch') public mapsSearchElementRef: ElementRef;

  constructor(
    private sidenavService: SidenavService,
    private projectService: ProjectService,
    private homepageSharedService: HomepageSharedService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // store sidenav to service
    this.sidenavService.setSidenav(this.leftSidenav);
    // set current position
    this.setUserCurrentPosition();

    // set the selected project



  }

  loadMapAPIs(event: any) {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.mapsSearchElementRef.nativeElement, {
        // types: ['address'] -- do not specify for getting all addresses, establishments and geocodes
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

          this.markerDatea = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
  }

  clickedMarker(m: Marker) {
    // console.log(`clicked the marker: ${label || index}`);
    // console.log(`clicked the marker: ${ m }`);

    this.projectService.getProject(m.idProject).then(project => this.selectedProject = project);

    this.router.navigate(['/home/project', m.idProject]);

    this.homepageSharedService.selectProject(this.selectedProject);

    // this.router.navigate(['/detail', id]);
    /*this.projectDetailDialog.open(ProjectDetailComponent);.afterClosed().filter(result => !!result)
     .subscribe(user => {
     this.users.push(user);
     this.selectedUser = user;
     }); */
  }

  setUserCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.lat = position.coords.latitude;
        // this.lng = position.coords.longitude;
        // this.zoom = 15;

        this.markerDatea = { lat: position.coords.latitude, lng: position.coords.longitude };
      });
    }
  }

}

interface Marker {
  lat: number;
  lng: number;
  idProject?: number;
  type?: string;
  iconUrl?: string;
}
