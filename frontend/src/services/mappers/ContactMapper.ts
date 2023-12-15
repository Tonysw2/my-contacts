class ContactMapper {
  topPersistence(data: any) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      category_id: data.categoryId,
    }
  }

  toDomain(data: any) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: {
        id: data.category?.id,
        name: data.category?.name,
      },
    }
  }
}

export default new ContactMapper()
