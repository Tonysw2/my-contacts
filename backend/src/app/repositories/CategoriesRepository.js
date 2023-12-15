const { prisma } = require('../../../prisma');

class CategoriesRepository {
  async create({ name }) {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return category;
  }

  async findAll() {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async findById(id) {
    const category = await prisma.category.findById({
      where: {
        id,
      },
    });

    return category;
  }

  async update(id, { name }) {
    const category = await prisma.category.update({
      where: {
        id,
      },

      data: {
        name,
      },
    });

    return category;
  }

  async delete(id) {
    const deleteOp = await prisma.category.delete({
      where: {
        id,
      },
    });

    return deleteOp;
  }
}

module.exports = { CategoriesRepository: new CategoriesRepository() };
