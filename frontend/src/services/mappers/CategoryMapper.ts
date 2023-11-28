class CategoryMapper {
  toDomain(data: any) {
    return {
      id: data.id,
      name: data.name,
    }
  }
}

export default new CategoryMapper()
