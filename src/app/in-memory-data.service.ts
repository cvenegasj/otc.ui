import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      { id: 21,  name: 'Parque Manhattan', description: 'Estrategia promovida por el observatorio ciudadano Lima Cómo Vamos',
        punctuation: 5, status: 'en proceso - faltan 5 días', creator: 'Colectivo Perú', duration: '2 meses aprox.' },
      { id: 22,  name: 'Fab Lab Digitoys', description: 'Laboratorio de Fabricación digital creativo para niños.',
        punctuation: 5, status: 'en proceso - faltan 16 días', creator: 'Henry Sánchez', duration: '3 meses' },
      { id: 23,  name: 'Open BioFab', description: 'Bio laboratorio comunitario para acerca la ciencia al ciudadano.',
        punctuation: 5, status: 'en proceso - faltan 20 días', creator: 'Carlos Venegas', duration: '2 meses' }
    ];
    return {projects};
  }
}
