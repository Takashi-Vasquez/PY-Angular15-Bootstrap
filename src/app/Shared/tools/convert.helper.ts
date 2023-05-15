// noinspection JSUnusedGlobalSymbols

import { DatePipe } from '@angular/common';
//import { MenuModel } from '@shared_models/common/menu.model';
//import { UserMenuModel } from '@shared_models/common/user.model';
import * as moment from 'moment';
import * as objectPath from 'object-path';
export module Converter {
  export module BASE {

    export function toQueryParams(obj: any) {
      return Object.keys(obj).filter(x => obj[x] !== null && obj[x] !== undefined).map(x => {
        let url = ''
        if (obj[x] instanceof Date) url = `${x}=${obj[x].toJSON()}`
        else url = `${x}=${obj[x]}`
        return url
      }).join('&');
    }

    export function genericConstructor<T>(C: { new(params: Partial<T>): T }, obj: Partial<T>): T {
      return new C(obj);
    }

    export function generateId(tag: string) {
      let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      let currentDate = new Date();
      let dataUTC = [
        currentDate.getUTCFullYear(),
        padNumber(currentDate.getUTCMonth() + 1),
        padNumber(currentDate.getUTCDate()),
        padNumber(currentDate.getUTCHours()),
        padNumber(currentDate.getUTCMinutes()),
        padNumber(currentDate.getUTCSeconds()),
        currentDate.getUTCMilliseconds(),
      ]

      let randomstring = `${tag}${dataUTC[0]}${dataUTC[1]}${dataUTC[2]}${dataUTC[3]}${dataUTC[4]}${dataUTC[5]}${dataUTC[6]}`;

      for (let i = 0; i < 10; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }

      return randomstring;
    }

    export function toInteger(value: any): number {
      return parseInt(`${value}`, 10);
    }

    export function isNumber(value: any): boolean {
      return !isNaN(toInteger(value));
    }

    export function padNumber(value: number) {
      if (isNumber(value)) {
        return `0${value}`.slice(-2);
      } else {
        return '';
      }
    }

    export function later(delay: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, delay);
      });
    }

    export function orderBy<T>(list: T[], key: string, type: number): T[] {
      if (Array.isArray(list)) {

        if (type === 1 || type === 2) {
          return list.sort((a, b) => {
            const value1 = (objectPath.get(<Object>a, key.trim()) as number) || 0;
            const value2 = (objectPath.get(<Object>b, key.trim()) as number) || 0;
            return (type === 1) ? value1 - value2 : value2 - value1;
          });
        }

        if (type === 3 || type === 4) {
          return list.sort((a, b) => {
            const value1 = (objectPath.get(<Object>a, key.trim()) as string).toLowerCase();
            const value2 = (objectPath.get(<Object>b, key.trim()) as string).toLowerCase();
            return (type === 3) ? (value1).localeCompare(value2) : (value2).localeCompare(value1);
          });
        }
      }
      return [];
    }

    export function buildTreeLevel2<T>(obj: T[], original: T[], IdParent: string) {
      return obj.filter((o: any) => o.IdParent === IdParent).map((o: any) => {
        // const node = { text: '', value: '', checked: false, collapsed: false, children: [] };
        // node.value = o.IdItem;
        // node.text = o.Nombre || o.Descripcion;
        const children = original.filter((so: any) => so.IdParent === o.IdCatalog);
        if (children && children.length > 0) {
          o.Children = buildTreeLevel2<T>(children, original, o.IdCatalog);
        } else {
          o.Children = [];
        }
        return o;
      });
    }

    export function toNumber(n: any, isOver: boolean): number {
      let numberValue = (n === null || n === '-' || n === '' || n === undefined) ? 0 : parseFloat(n.toString().replace(/S\/./g, '').replace(/[^-?\d.]/g, ''));
      if (isNaN(numberValue) || (!isOver && numberValue > 999999999999)) {
        numberValue = 0;
      }
      return numberValue;
    }

    export function parseNumber(number: any) {
      return number != null ? parseFloat(String(number).trim().replace(/,/g, "")) : 0;
    }

    export function getBufferFrom64(base64: string) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      return new Uint8Array(byteNumbers);
    }

    export function mapObjectToFormData(obj: any, form?: FormData, prefix?: string): FormData {
      const formData = form ?? new FormData();
      let prop = '';
      for (const key of Object.keys(obj)) {
        if (prefix) {
          prop = `${prefix}[${key}]`;
        } else {
          prop = key;
        }

        if (obj[key] !== undefined && obj[key] != null) {
          if ((obj[key] instanceof Date)) {
            formData.append(prop, (obj[key] as Date).toISOString());
          } else if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
            mapObjectToFormData(obj[key], formData, prop);
          } else {
            formData.append(prop, obj[key]);
          }
        }
      }
      return formData;
    }

    export function to3Decimal(num: number): number {
      return Math.round((num + Number.EPSILON) * 1000) / 1000;
    }

    export function random(min: number, max: number, decimal: boolean = false): number {
      if (!decimal) return Math.round(Math.random() * ((max + 1) - min) + min);
      else {
        return Math.floor(Math.random() * (max * 100 - min * 100) + min * 100) / (1 * 100);
      }
    }

    // export function buildMenu(list: UserMenuModel[], originalList: UserMenuModel[], idParent: number): MenuModel[] {
    //   return list.filter(x => x.padreId == idParent).map(x => {
    //     let menu = new MenuModel({ id: x.id, title: x.titulo, url: x.pagina, icon: x.svg, actions: x.privilegio });
    //     let children = originalList.filter(c => c.padreId == x.id);

    //     if (children.length > 0) {
    //       menu.submenu = BASE.buildMenu(children, originalList, menu.id);
    //     } else {
    //       menu.submenu = x.submenu.map(y => new MenuModel({ id: y.id, title: y.titulo, url: y.pagina, icon: y.svg, actions: y.privilegio }))
    //     }
    //     return menu;
    //   });
    // }

    // export function menuToOneLevel(menu: UserMenuModel[]): UserMenuModel[] {
    //   let menuList: UserMenuModel[] = [];
    //   for (let item of menu) {
    //     if (item.submenu.length > 0) {
    //       menuList.push(item);
    //       menuList = menuList.concat(BASE.menuToOneLevel(item.submenu))
    //     }
    //     else menuList.push(item);
    //   }
    //   return menuList;
    // }

    export function distinct<T>(array: T[]) {
      return array.filter((v, i, a) => a.indexOf(v) === i);
    }

    export function stringNormalize(value: string) {
      return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    export function urlNormalize(url: string) {
      return url.toLocaleLowerCase().replace(/[^a-z\/\-].*/g, '').replace(/\/$/, '');
    }
  }
  export module DOWNLOAD {
    export function downloadFromBase64(base64: string, mimeType: string, fileName: string, prefix?: string, ext?: string) {
      // const byteCharacters = atob(base64);
      // const byteNumbers = new Array(byteCharacters.length);
      // for (let i = 0; i < byteCharacters.length; i++) {
      //     byteNumbers[i] = byteCharacters.charCodeAt(i);
      // }
      // new Uint8Array(byteNumbers);
      const byteArray = BASE.getBufferFrom64(base64);
      const blob = new Blob([byteArray], { type: mimeType });
      downloadFromBlob(blob, `${fileName.length > 0 ? fileName : `${prefix}_${new Date().toISOString()}.${ext}`}`);
    }

    export function downloadFromBuffer(buffer: BlobPart[], mimeType: string, filename?: string, prefix?: string, extension?: string) {
      const blob = new Blob(buffer, { type: mimeType });
      filename = filename ?? `${prefix}_${new Date().toISOString()}.${extension}`;
      downloadFromBlob(blob, filename);
    }

    export function downloadFromBlob(blob: Blob, filename: string) {

      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }

    export function downloadUrl(fileUrl: string, fileName: string) {
      var a = document.createElement("a");
      a.href = fileUrl;
      a.setAttribute("download", fileName);
      a.click();
    }

    export function getUrlFromFile(data: Blob): Promise<string> {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      return new Promise((resolve) => {
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          resolve(event.target.result);
        };
      });
    }
  }
  export module DATE {
    export const dateFormat = "yyyy-MM-dd";
    export const dateAndTimeFormat = "yyyy-MM-ddTHH:mm";
    export const longFormat = "EEEE, MMMM d, y";

    export function fromAPItoDATE(date: any, withTime: boolean = false): Date {
      if (!withTime) date = `${date}T00:00`;
      return new Date(date);
    }

    export function firstDayOfMonth(date?: Date) {
      if (date) return moment(date).startOf('month').toDate();
      return moment().startOf('month').toDate();
    }

    export function lastDayOfMonth(date?: Date) {
      if (date) return moment(date).endOf('month').toDate();
      return moment().endOf('month').toDate();
    }

    export function firstPreviousDate(amount: number, unit: moment.unitOfTime.DurationConstructor, date?: Date) {
      if (date) return moment(date).subtract(amount, unit).startOf(unit).toDate();
      return moment().subtract(amount, unit).startOf(unit).toDate();
    }

    export function lastPreviousDate(amount: number, unit: moment.unitOfTime.DurationConstructor, date?: Date) {
      if (date) return moment(date).subtract(amount, unit).endOf(unit).toDate();
      return moment().subtract(amount, unit).endOf(unit).toDate();
    }

    export function transform(date: Date = new Date(), format: string = dateFormat) {
      const pipe = new DatePipe('es-PE');
      return pipe.transform(date, format);
    }

    export function generateArray(start: number, end: number, inverse: boolean = false) {
      let list: any[] = [...Array(end - start + 1).keys()].map(x => inverse ? end - x : start + x)
      return list.map(x => {
        return {
          id: x,
          name: `${x}`
        };
      }).reverse();
    }

    export function getYear(startYear = 2022, endYear = new Date().getFullYear()) {
      let years = [];
      for (let i = endYear; i >= startYear; i--) {
        years.push({ id: i, name: i.toString() });
      }
      return years;
    }

    export function getMonths() {
      let months = []; months = [
        { id: 1, name: "Enero" },
        { id: 2, name: "Febrero" },
        { id: 3, name: "Marzo" },
        { id: 4, name: "Abril" },
        { id: 5, name: "Mayo" },
        { id: 6, name: "Junio" },
        { id: 7, name: "Julio" },
        { id: 8, name: "Agosto" },
        { id: 9, name: "Septiembre" },
        { id: 10, name: "Octubre" },
        { id: 11, name: "Noviembre" },
        { id: 12, name: "Diciembre" }
      ];
      return months;
    }

    export function MonthName(mes: number) {
      let months = new Map(getMonths().map(r => [r.id, r.name]));
      return months.get(mes);
    }

    export function getDateTimeFromDateOnlyAndTimeOnly(date: Date, time: string): Date {
      return new Date(`${Converter.DATE.transform(date)}T${time}`);
    }

    export function getFirstAndLastDateOfMonth(month: number, year = new Date().getFullYear()): { startDate: Date, endDate: Date } {
      let dateMonth = new Date(year, month, 1);
      return { startDate: DATE.firstDayOfMonth(dateMonth), endDate: DATE.lastDayOfMonth(dateMonth) };
    }

    export function getDatesOfMonth(month: number, inStringFormat = false, year = new Date().getFullYear()) {
      let { startDate, endDate } = DATE.getFirstAndLastDateOfMonth(month, year);
      var dates = [];

      var currDate = moment(startDate).startOf('day');
      var lastDate = moment(endDate).startOf('day');

      dates.push((inStringFormat) ? DATE.transform(startDate) : startDate);
      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        if (inStringFormat) dates.push(DATE.transform(currDate.clone().toDate()))
        else dates.push(currDate.clone().toDate());
      }
      dates.push((inStringFormat) ? DATE.transform(endDate) : endDate);

      return dates;
    }
  }
  export module TIME {
    export function to24h(time: string): string {
      return moment(time, ['h:mm A']).format("HH:mm");
    }

    export function to12h(time: string): string {
      return moment(time, ['HH:mm']).format("h:mm A");
    }

    export function dateToTime(date = new Date()) {
      return TIME.to24h(`${date.getHours()}:${date.getMinutes()}`);
    }

    export function timeRangeToString(timeStart: Date | string, timeEnd: Date | string): string {
      return `${DATE.transform(new Date(timeStart), 'HH:mm')} - ${DATE.transform(new Date(timeEnd), 'HH:mm')}`;
    }
  }
}
