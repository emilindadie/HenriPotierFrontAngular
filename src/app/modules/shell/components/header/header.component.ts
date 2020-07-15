import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { panierContentCountSelector } from 'src/app/modules/global-panier-ngrx/selectors/panier.selector';
import { IPanierState } from 'src/app/modules/global-panier-ngrx/states/panier.state.i';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  panierContentCount$: Observable<number> = new Observable();

  constructor(private store: Store<IPanierState>) {}

  ngOnInit(): void {
    this.panierContentCount$ = this.store.pipe(
      select(panierContentCountSelector),
    );
  }
}
