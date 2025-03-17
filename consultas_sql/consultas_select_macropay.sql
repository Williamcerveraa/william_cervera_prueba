--consulta para retornar valores de la tabla books

SELECT  [id]
      ,[title]
      ,[year]
      ,[author]
  FROM [macropay].[dbo].[books]

--consulta para retornar valores de la tabla ratings
SELECT [reviewer_id]
      ,[book_id]
      ,[rating]
      ,[rating_date]
  FROM [macropay].[dbo].[ratings]

--consulta para retornar valores de la tabla reviewers
SELECT [id]
      ,[name]
  FROM [macropay].[dbo].[reviewers]

--consulta para retornar los valores de la tabla final con los datos ordenados por el nombre del reviewer, seguido del title y por ultimo del rating de manera descendiente
-- (más alto al más bajo)

/*se usan join para uniones de tablas 

vinculando la tabla ratings con reviewers para obtener el nombre del revisor
JOIN reviewers rev ON r.reviewer_id = rev.id

JOIN books b ON r.book_id = b.id
vinculando la tabla ratings con books para obtener el título del libro

El select para seleccionar los campos de las columnas y el AS para renonmbrar las columnas a mostrar

El From para especificar de que tabla se hace la seleccion de columnas

El ON para especificar la unión de cuales columnas de las tablas deben coincidir para que se cumplan las condiciones solicitadas

Se opto por usar join (inner join) debido a que no queremos ver valores nulos como libros sin rating, es mejor ver los libros que ya cuentan con valores
*/
SELECT
  rev.name AS name,
  b.title AS title,
  r.rating AS rating,
  r.rating_date AS rating_date
FROM ratings r
JOIN reviewers rev 
    ON r.reviewer_id = rev.id
JOIN books b 
    ON r.book_id = b.id
ORDER BY rev.name, b.title, r.rating DESC;

