module.exports = {
  heroDetail: (hero) => {
    return {
      _id: hero._id,
      nickname: hero.nickname,
      real_name: hero.real_name,
      origin_description: hero.origin_description,
      superpowers: hero.superpowers,
      catch_phrase: hero.catch_phrase,
      images: hero.images,
      createdAt: hero.createdAt,
      updatedAt: hero.updatedAt,
    }
  },

  herosList: (heros) => {
    return heros.map(hero => {
      return {
        _id: hero._id,
        nickname: hero.nickname,
        real_name: hero.real_name,
        image: hero.images[Math.floor(Math.random() * hero.images.length)],
        createdAt: hero.createdAt,
        updatedAt: hero.updatedAt,
      }
    })
  },
};
