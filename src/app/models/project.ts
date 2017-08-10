export class Project {
  idProject: number;
  address: string;
  name: string;
  description: string;
  isOccupied: boolean;
  isToBeOccupied: boolean;
  isInConflict: boolean;
  intervenedSpace: string;
  area: number;
  startPeriod: string;
  endPeriod: string;
  inaugurationDate: string;
  elements: string;
  execution: string;
  donations: string;
  materials: string;
  photoUrl: string;
  processDescription: string;
  latitude: string;
  longitude: string;
  creationDateTime: string;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;

  constructor() { }
}
