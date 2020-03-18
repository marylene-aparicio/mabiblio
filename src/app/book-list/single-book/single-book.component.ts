import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService, private router: Router) { }

  // Recupération du livre demandé par son ID
  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  // Retour à la liste des livres
  onBack() {
    this.router.navigate(['/books']);
  }

}
