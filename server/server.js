const express = require('express');
const app = express();
const port = 3000;

const {
  getAllContacts,
  getContactById,
  deleteContactById
} = require('../database/fakedatabase');

const { swaggerDocs } = require('./documentation/swaggerConfig');

app.use(express.json());

swaggerDocs(app);

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         addressLines:
 *           type: string
 *       example:
 *         name : Abbigail Wunsch
 *         phone : 555-123-4567
 */
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Obtiene la lista completa de contactos
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: query
 *         name: phrase
 *         schema:
 *           type: string
 *         description: Frase para filtrar los contactos por nombre
 *     responses:
 *       200:
 *         description: Lista de contactos
 *       400:
 *         description: Petición incorrecta (si `phrase` está presente pero vacío)
 */
app.get('/contacts', (req, res) => {
    let contacts = getAllContacts();
  
    const { phrase } = req.query;
  
    //  a) Si "phrase" está presente pero está vacío, responder con 400 Bad Request
    if (phrase !== undefined && phrase.trim() === '') {
      return res.status(400).send(); // Cuerpo de la respuesta vacío
    }
  
    //   b) Si "phrase" está presente y no está vacío, filtramos los contactos
    //      para que coincidan (case-insensitive substring match) con la frase.
    if (phrase !== undefined && phrase.trim() !== '') {
      const phraseLower = phrase.toLowerCase();
      contacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(phraseLower)
      );
    }
  
    // 3. Ordenar los contactos por nombre (ascending)
    contacts.sort((a, b) => a.name.localeCompare(b.name));
  
    // 4. Devolver el array resultante (puede estar vacío si no hubo coincidencias)
    res.json(contacts);
  });
  

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Obtiene un contacto por su ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto para mostrar sus datos
 *     responses:
 *       200:
 *         description: Contacto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto no encontrado
 */
app.get('/contacts/:id', (req, res) => {
  const contactId = parseInt(req.params.id, 10);

  const contact = getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Elimina el usuario 
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a eliminar
 *     responses:
 *       204:
 *         description: No content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto no encontrado
 */
app.delete('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id, 10);
  
    const deleted = deleteContactById(contactId);
  
    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).send();
    }
  });

  app.get('/', (req, res) => {
    res.send(`
      <h1>CONTACTS BOOKS API</h1>
      <p>Available endpoints:</p>
      <ul>
        <li><strong>GET</strong> /contacts</li>
        <li><strong>GET</strong> /contacts/:id</li>
        <li><strong>DELETE</strong> /contacts/:id</li>
        <li><strong>API DOCS</strong> /api-docs</li>
      </ul>
    `);
  });
  

app.all('/contacts/:id', (req, res, next) => {
  return res.status(405).send('Method Not Allowed');
});


app.all('/contacts', (req, res, next) => {
  return res.status(405).send('Method Not Allowed');
});

app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
