import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'UtcToLocalDate'})
export class UtcToLocalDatePipe implements PipeTransform {
    transform(utcString: string): string {
        const utcDate: Date = this.utcStringToDate(utcString);
        const localDate = new Date(+utcDate + utcDate.getTimezoneOffset());
        return this.dateToString(localDate);
    }

    private dateToString(date: Date) {
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    private utcStringToDate(utcString: string) {
        const utcArr = utcString.split(' ');
        const date = this.serializeDate(utcArr[0]);
        const time = this.serializeTime(utcArr[1]);
        return new Date(Date.UTC(date.year, date.month - 1, date.day, time.hours, time.minutes, time.seconds));
    }


    private serializeDate(date: string) {
        const dateArr = date.split('-');
        return {
            day: +dateArr[0],
            month: +dateArr[1],
            year: +dateArr[2]
        };
    }

    private serializeTime(time: string) {
        const timeArr = time.split(':');
        return {
            hours: +timeArr[0],
            minutes: +timeArr[1],
            seconds: +timeArr[2]
        };
    }
}
