// drop tables
module.exports = async function () {
  try {
    await global.sequelize.drop()
    await global.sequelize.close()
  } catch (err) {
    console.log(err)
  }
}