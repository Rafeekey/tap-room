import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { Keg }  from './keg'

@Component({
  selector: 'low-keg',
  templateUrl: './app/low-keg.html',
  styles: [`
      .indKeg {
        font-weight: bold;
      }
    `]
})

export class LowKegComponent {
  @Input() childKegsList: Keg[];
  @Output() childSelectedKeg = new EventEmitter();
  @Output() childOPSellPint = new EventEmitter();
  @Output() childTotalSales = new EventEmitter();
  @Output() childTotalPints = new EventEmitter();

  theKeg: Keg;
  soldPint: Keg;
  pintsSold = 0;
  totalSales = 0;

  childOnSelect(chosenKeg: Keg) {
    this.theKeg = chosenKeg;
    this.childSelectedKeg.emit(this.theKeg);
  }

  lowKegs(): Keg[] {
    var kegArray: Keg[] = [];
    this.childKegsList.forEach(function(keg){
      if(keg.pints <= 10 && keg.pints > 0) {
        kegArray.push(keg);
      }
    })
    return kegArray;
  };

  childSellPint(chosenKeg: Keg) {
    this.soldPint = chosenKeg;
    this.soldPint.pints -= 1;
    this.childOPSellPint.emit(this.soldPint);
    this.totalSales += this.soldPint.price;
    this.childTotalSales.emit(this.totalSales);
    this.pintsSold += 1;
    this.childTotalPints.emit(this.pintsSold);
  }
}
