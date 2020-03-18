import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../models/Book.model';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  // Souscrit au Subject du service et déclenche sa première émission
  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    // Affiche la liste des livres
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  // Ajouter un nouveau livre
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  // Supprimer un livre
  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  // Affiche le détail d'un livre
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  
  // Arrêt à la souscription
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
