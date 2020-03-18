export class Book {
    // Facultatif
    photo: string;
    // synopsis: string;

    // Obligatoire
    constructor(
        public title: string,
        public author: string
    ) {}
}