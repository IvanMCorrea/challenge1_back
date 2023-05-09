const mongoose = require("mongoose");
const Team = require("../models/Team");
const cheerio = require('cheerio');
const axios = require('axios')

const leaderboardController = {
  scrapper: async (req, res) => {
    try {
        const url = 'https://www.futbolargentino.com/primera-division/tabla-de-posiciones'
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const posiciones = [];

        $('table tbody tr').each((index, element) => {
          const posicion = $(element).find('td:nth-child(1)').text().trim();
          const equipo = $(element).find('td:nth-child(2) span.d-md-inline').text().trim();
          const partidosJugados = $(element).find('td:nth-child(3)').text().trim();
          const partidosGanados = $(element).find('td:nth-child(4)').text().trim();
          const partidosPerdidos = $(element).find('td:nth-child(5)').text().trim();
          const partidosEmpatados = $(element).find('td:nth-child(6)').text().trim();
          const golesFavor = $(element).find('td:nth-child(7)').text().trim();
          const golesContra = $(element).find('td:nth-child(8)').text().trim();
          const diferenciaGoles = $(element).find('td:nth-child(9)').text().trim();
          const puntos = $(element).find('td:nth-child(10)').text().trim();

          posiciones.push({
            posicion,
            equipo,
            partidosJugados,
            partidosGanados,
            partidosPerdidos,
            partidosEmpatados,
            golesFavor,
            golesContra,
                diferenciaGoles,
                puntos,
              });
            });
            
        console.log(posiciones)
        res.status(200).send({
          status: true,
          msg: "Data loaded",
          data: posiciones
      });
    } catch (error) {
        console.log(error);
        res.status(409).send({
            status: false,
            msg: "Error getting data",
            error: error,
        });
    }
  },

  getLeaderboard: async (req, res) => {
    try {
      res.status(200).send({
          status: true,
          msg: "Data loaded",
          data: posiciones
      })
    } catch (error) {
      console.log(error);
      res.status(409).send({
        status: false,
        msg: "Error getting data",
        error: error,
      });
    }
  }
}

module.exports = leaderboardController;