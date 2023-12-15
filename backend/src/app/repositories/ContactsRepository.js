const { prisma } = require('../../../prisma');

class ContactsRepository {
  async findAll(orderBy = 'asc') {
    const direction = orderBy.toUpperCase() === 'desc' ? 'desc' : 'asc';

    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        category: true,
      },

      orderBy: {
        name: direction,
      },
    });

    return contacts;
  }

  async findById(id) {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        category: true,
      },
    });

    return contact;
  }

  async findByEmail(email) {
    const contact = await prisma.contact.findUnique({
      where: {
        email,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        category: true,
      },
    });

    return contact;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const contact = await prisma.contact.create({
      data: {
        name, email, phone, category_id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        category: true,
      },
    });

    return contact;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const contact = await prisma.contact.update({
      where: {
        id,
      },

      data: {
        name, email, phone, category_id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        category: true,
      },
    });

    return contact;
  }

  async delete(id) {
    const deleteOp = await prisma.contact.delete({
      where: {
        id,
      },
    });

    return deleteOp;
  }
}

module.exports = { ContactsRepository: new ContactsRepository() };
