import React from "react";
import American from "../../assets/AMERICAN_STANDARD.png";
import Euro from "../../assets/EURO_STANDARD.png";
import CHAdeMO from "../../assets/CHAdeMO.png";
import DB_T from "../../assets/DB_T.png";
import GB_T_DC from "../../assets/GB_T_DC.png";
import Tesla from "../../assets/Tesla_supercharger.png";
import Type1_CSS_Combo1 from "../../assets/type1_CSS_Combo1.png";
import Type1_J1772 from "../../assets/type1_J1772.png";
import Type2_css_combo2 from "../../assets/Type2_css_combo2.png";
import Type2_Mennekes from "../../assets/Type2_Mennekes.png";

import { Typography } from "@material-ui/core";
const imgStyle = {
  width: "100%",
  height: "80%",
  objectFit: "contain",
};

const ChargerIcon = ({ plugin }) => {
  switch (plugin) {
    case "American_standard":
      return (
        <>
          <img
            src={American}
            style={imgStyle}
            alt="American standard plugin icon "
          />
          <Typography>American standard</Typography>{" "}
        </>
      );
    case "Euro_standard":
      return (
        <>
          <img src={Euro} style={imgStyle} alt="Euro standard plugin icon" />
          <Typography>Euro standard</Typography>{" "}
        </>
      );
    case "Tesla_supercharger":
      return (
        <>
          <img
            src={Tesla}
            style={imgStyle}
            alt="Tesla supercharger plugin icon "
          />{" "}
          <Typography>Tesla Supercharger</Typography>
        </>
      );
    case "CHAdeMO":
      return (
        <>
          <img src={CHAdeMO} style={imgStyle} alt="CHAdeMO plugin icon" />{" "}
          <Typography>CHAdeMO</Typography>
        </>
      );
    case "DB_T":
      return (
        <>
          <img src={DB_T} style={imgStyle} alt="DB T plugin icon" />
          <Typography>DB T </Typography>
        </>
      );
    case "GB_T_DC":
      return (
        <>
          <img src={GB_T_DC} style={imgStyle} alt="GB T DC plugin icon" />
          <Typography>GB T DC </Typography>
        </>
      );
    case "Type1_CSS_Combo1":
      return (
        <>
          <img
            src={Type1_CSS_Combo1}
            style={imgStyle}
            alt="Type1 CSS Combo1 plugin icon"
          />
          <Typography>Type1 CSS Combo1</Typography>
        </>
      );
    case "Type1_J1772":
      return (
        <>
          <img
            src={Type1_J1772}
            style={imgStyle}
            alt="Type1 J1772 plugin icon"
          />
          <Typography>Type1 J1772 </Typography>{" "}
        </>
      );
    case "Type2_css_combo2":
      return (
        <>
          <img
            src={Type2_css_combo2}
            style={imgStyle}
            alt="Type2 css combo2 plugin icon"
          />
          <Typography>Type2 CSS combo2</Typography>
        </>
      );
    case "Type2_Mennekes":
      return (
        <>
          <img
            src={Type2_Mennekes}
            style={imgStyle}
            alt="Type2 Mennekes plugin icon"
          />
          <Typography>Type2 Mennekes</Typography>
        </>
      );

    default:
      break;
  }
};

export default ChargerIcon;
