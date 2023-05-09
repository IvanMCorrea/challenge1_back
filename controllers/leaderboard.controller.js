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
          const partidos_jugados = $(element).find('td:nth-child(3)').text().trim();
          const partidos_ganados = $(element).find('td:nth-child(4)').text().trim();
          const partidos_perdidos = $(element).find('td:nth-child(5)').text().trim();
          const partidos_empatados = $(element).find('td:nth-child(6)').text().trim();
          const goles_favor = $(element).find('td:nth-child(7)').text().trim();
          const goles_contra = $(element).find('td:nth-child(8)').text().trim();
          const diferencia_goles = $(element).find('td:nth-child(9)').text().trim();
          const puntos = $(element).find('td:nth-child(10)').text().trim();

          posiciones.push({
            posicion,
            equipo,
            partidos_jugados,
            partidos_ganados,
            partidos_perdidos,
            partidos_empatados,
            goles_favor,
            goles_contra,
            diferencia_goles,
            puntos,
              });
            });
            
        await Promise.all(posiciones.map( async (item)=>{
          const newTeam = await Team(item);
          await newTeam.save();
        }))
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