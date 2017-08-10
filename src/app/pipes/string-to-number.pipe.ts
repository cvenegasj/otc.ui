import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toNumber'})
export class StringToNumberPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value);
  }
}
