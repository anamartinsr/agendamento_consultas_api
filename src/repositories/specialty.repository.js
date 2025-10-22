import prisma from '../../prisma/index.js';

class SpecialtyRepository {
  async create(data) {
    return prisma.specialty.create({ data });
  }

  async findAll() {
    return prisma.specialty.findMany({
      include: {
        professionals: true,
      },
    });
  }

  async findById(id) {
    return prisma.specialty.findUnique({
      where: { id },
      include: {
        professionals: true,
      },
    });
  }

  async update(id, data) {
    return prisma.specialty.update({
      where: { id },
      data,
      include: {
        professionals: true,
      },
    });
  }

  async delete(id) {
    return prisma.specialty.delete({
      where: { id },
    });
  }
}

export default new SpecialtyRepository();