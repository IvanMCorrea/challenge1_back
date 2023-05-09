const mongoose = require("mongoose");

const TeamScheme = new mongoose.Schema(
  {
    name: { 
      type: String,
      unique: true
    },
    position: Number,
    logo: String,
    partidos_jugados: Number,
    ganados: Number,
    empatados: Number,
    perdidos: Number,
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