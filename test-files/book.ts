import { IArticle } from 'src/app/modules/shared/models/article.model.i';
import { IBook } from 'src/app/modules/article/models/book.model.i';

const book: IBook = {
    cover: '',
    isbn: '',
    price: 500,
    synopsis: [
        ''
    ],
    title: 'Toto'
};

export const mockGetAllbooks: IArticle[] = [
    book
];
