
let contactsDb = [
  {
    id: 1,
    name: "Abbigail Wunsch",
    phone: "555-123-4567",
    addressLines: ["123 Main Street", "Apt 2"]
  },
  {
    id: 2,
    name: "Zoila Daugherty II",
    phone: "555-987-6543",
    addressLines: ["456 West Avenue", "Suite 100"]
  },
  {
    id: 3,
    name: "Theresa Gorczany",
    phone: "555-555-5555",
    addressLines: ["789 Central Blvd"]
  },
  {
    id: 4,
    name: "Zakary Mayer",
    phone: "555-999-1234",
    addressLines: ["101 East Side", "Floor 3"]
  }
];

/**
 * Retorna la lista completa de contactos
 */
function getAllContacts() {
  return contactsDb;
}

/**
 * Dado un ID de contacto, retorna ese contacto si existe; de lo contrario, `undefined`.
 * @param {number} contactId - El ID del contacto a buscar.
 */
function getContactById(contactId) {
  return contactsDb.find(contact => contact.id === contactId);
}

/**
 * Elimina el contacto con el ID especificado.
 * Retorna `true` si se eliminó, o `false` si no se encontró un contacto con ese ID.
 * @param {number} contactId - El ID del contacto a eliminar.
 * @returns {boolean} - `true` si se eliminó, `false` si no se encontró.
 */
function deleteContactById(contactId) {
  const originalLength = contactsDb.length;
  contactsDb = contactsDb.filter(contact => contact.id !== contactId);
  return contactsDb.length < originalLength;
}


module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById
};

  