module.exports = {
  registroCheques: async (req, res) => {
    try {
      res.render("pagos/cheques/registroCheques");
    } catch (error) {
      console.log(error);
    }
  }
}