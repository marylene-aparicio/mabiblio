import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  // Emission du tableau des livres
  emitBooks() {
    this.booksSubject.next(this.books);
  }

  // enregistrer les livres sur le serveur
  // La methode ref() retourne une référence au node demandé de la base de données 
  // et set() fonctionne comme put pour le HTTP, il écrit et remplace les données
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  // Recupérer la liste des livres sur le serveur
  // La methode on() permet d'accelerer l'execution des scripts notamment pour des menus ou des zones dynamiques
  // val() retourne la valeur des données
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
      }
    );
  }

  // Récupérer un seul livre en fonction de son id
  // once() ne fait qu'une seule requete de données
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // creer un nouveau livre
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // Supprimer un livre existant
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookElement) => {
        if(bookElement === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

}
