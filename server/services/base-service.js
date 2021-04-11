module.exports = class Service {
    
    async findAll() {
      return this.model.find()
    }

    async find(itemId) {
      return this.model.findById(itemId)
    }

    async findByUserId(userId) {
      return this.model.find({ userId: userId })
    }

    async add(item) {
      return this.model.create(item)
    }

    async  del(itemId) {
      return this.model.deleteOne({ _id: itemId })
    }
  
    async update(data) {
      return this.model.findByIdAndUpdate({ _id: data.id }, data )
    }

  }
  