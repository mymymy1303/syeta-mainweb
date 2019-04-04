import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'VndCurrency' })
export class VndCurrency implements PipeTransform {
    transform(priceString: string): string {
        return this.toCurrencyFormat('' + priceString) + ' VND';
    }

    private toCurrencyFormat(str: string): string {
        let currencyFormat = '';
        let index = 0;
        if (str.length > 3) {
            if (str.length % 3 === 0) {
                index = 3;
                currencyFormat = currencyFormat + str[0] + str[1] + str[2];
                for (index; index < str.length; index++) {
                    const element = str[index];
                    if ((index % 3 === 0) && (index !== (str.length - 1))) {
                        currencyFormat += ',';
                    }
                    currencyFormat += element;
                }
            } else if (str.length % 3 === 1) {
                index = 1;
                currencyFormat = currencyFormat + str[0] + ',';
                for (index; index < str.length; index++) {
                    const element = str[index];
                    if ((index % 3 === 1) && (index !== (str.length - 1)) && (index >= 4)) {
                        currencyFormat += ',';
                    }
                    currencyFormat += element;
                }
            } else if (str.length % 3 === 2) {
                index = 2;
                currencyFormat = currencyFormat + str[0] + str[1] + ',';
                for (index; index < str.length; index++) {
                    const element = str[index];
                    if ((index % 3 === 2) && (index !== (str.length - 1)) && (index >= 5)) {
                        currencyFormat += ',';
                    }
                    currencyFormat += element;
                }
            }

        } else {
            currencyFormat = str;
        }
        return currencyFormat;
    }
}
