import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const graphSchema: IGraphqlSchema = {

  type:
    `
    type GraphChart {
     name: String!
     value: Int!
    }



  type Graph {
      pieGrid: [GraphChart]
      pieChart: [GraphChart] ,
      chartBar: [GraphChart] ,
    }
   `,
  query:
    `
     graph: Graph
`
};
