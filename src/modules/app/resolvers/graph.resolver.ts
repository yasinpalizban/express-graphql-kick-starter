import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";


export const GraphResolver = {

  graph({ paginate, search }, req: Request): any {


    // data goes here
    const chartBarV: any = [
      {
        "name": "China",
        "value": 2243772
      },
      {
        "name": "USA",
        "value": 1126000
      },
      {
        "name": "Norway",
        "value": 296215
      },
      {
        "name": "Japan",
        "value": 257363
      },
      {
        "name": "Germany",
        "value": 196750
      },
      {
        "name": "France",
        "value": 204617
      }
    ];


    const pieChart: any = [
      { name: "Mobiles", value: 105000 },
      { name: "Laptop", value: 55000 },
      { name: "AC", value: 15000 },
      { name: "Headset", value: 150000 },
      { name: "Fridge", value: 20000 }
    ];
    const pieGrid: any = [
      { name: "Mobiles", value: 8000 },
      { name: "Laptop", value: 5600 },
      { name: "AC", value: 5500 },
      { name: "Headset", value: 15000 },
      { name: "Fridge", value: 2100 }
    ];


    return {
      pieGrid: pieGrid,
      pieChart: pieChart,
      chartBar: chartBarV
    };

  }
};

