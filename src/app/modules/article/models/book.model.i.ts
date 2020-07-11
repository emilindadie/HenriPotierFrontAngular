import { IArticle } from '../../shared/models/article.model.i';

export interface IBook extends IArticle {
    synopsis: Array<string>;
}
