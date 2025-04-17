module.exports = {
  inicio: (req, res) => {
    try {
      res.render("rentas/rentas");
    } catch (error) {
      res.send(error)
    }
  },

  automation: (req, res) => {
    try {
      res.render("rentas/automation");
    } catch (error) {
      res.send(error);
    }
  }
}