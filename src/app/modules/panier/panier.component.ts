import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../shared/models/article.model.i';
import { IPanierState } from '../global-panier-ngrx/states/panier.state.i';
import { Store, select } from '@ngrx/store';
import { panierContentSelector } from '../global-panier-ngrx/selectors/panier.selector';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  articles$: Observable<IArticle[]> = new Observable();
  componentIsActive = true;

  constructor(private panierStore: Store<IPanierState>) {}

  ngOnInit(): void {
    this.articles$ = this.panierStore.pipe(select(panierContentSelector));
  }


  removeArticleIntoPanier(index: number) {
    console.log(index);
  }
}
