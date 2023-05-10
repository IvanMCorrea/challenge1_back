const mongoose = require("mongoose");

const TeamScheme = new mongoose.Schema(
  {
    equipo: String,
    posicion: Number,
    partidos_jugados: Number,
    partidos_ganados: Number,
    partidos_empatados: Number,
    partidos_perdidos: Number,
    goles_favor: Number,
    goles_contra: Number,
    diferencia_goles: Number,
    puntos: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Team", TeamScheme);
