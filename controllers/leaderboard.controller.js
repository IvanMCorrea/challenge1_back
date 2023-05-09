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

        $('.tabla-posiciones tbody tr').each((index, element) => {
          const posicion = $(element).find('td:nth-child(1)').text();
          const equipo = $(element).find('td:nth-child(2)').text();
          const partidosJugados = $(element).find('td:nth-child(3)').text();
          const partidosGanados = $(element).find('td:nth-child(4)').text();
          const partidosPerdidos = $(element).find('td:nth-child(5)').text();
          const partidosEmpatados = $(element).find('td:nth-child(6)').text();
          const golesFavor = $(element).find('td:nth-child(7)').text();
          const golesContra = $(element).find('td:nth-child(8)').text();
          const diferenciaGoles = $(element).find('td:nth-child(9)').text();
          const puntos = $(element).find('td:nth-child(10)').text();

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
  }
}

module.exports = leaderboardController;