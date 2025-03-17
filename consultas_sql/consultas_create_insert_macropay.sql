--creacion de la tabla books
create table books(id int, title varchar(250), year int, author varchar(250));

--creacion de la tabla reviewers
create table reviewers(id int, name varchar(250));

create table ratings(reviewer_id int, book_id int, rating int, rating_date date);

--insertar datos en la tabla de books
INSERT INTO books VALUES (101,'A tale Of Two Cities',1859,'Charles Dickens'),(102,'The Lord of the Rings',1955,'J. R. R. Tolkien'),(103,'The Hobbit',1937,NULL),(104,'The Little Prince',1943,'Antoine de Saint-Exupéry');

--insertar datos en la tabla de ratings
INSERT INTO ratings VALUES (15201,101,2,'2015-02-11'),(15201,101,4,'2015-06-16'),(53202,103,4,NULL);

--insertar datos en la tabla de reviewers
INSERT INTO reviewers VALUES (15201,'Joe Martinez'),(53202,'Alice Lewis'),(44203,'John Smith');