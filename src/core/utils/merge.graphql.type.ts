import { IGraphqlSchema } from "core/interfaces/graphql.schema";

export function mergeSchemaGraphql(...schemas: IGraphqlSchema[]): string {
 // building  schema
  let scalars: string = "";
  let inputs: string = "";
  let unions: string = "";
  let enums: string = "";
  let interfaces: string = "";
  let types: string = "";
  let fragments: string = "";
  let queries: string = "";
  let mutations: string = "";
  for (let j = 0; j < schemas.length; j++) {
    const item = schemas[j];

    if (item.scalar) {
      scalars = scalars.concat(item.scalar);
    }

    if (item.enum) {
      enums = enums.concat(item.enum);
    }

    if (item.interface) {
      interfaces = interfaces.concat(item.interface);
    }

    if (item.type) {
      types = types.concat(item.type);
    }

    if (item.union) {
      unions = unions.concat(item.union);
    }

    if (item.input) {
      inputs = inputs.concat(item.input);
    }

    if (item.query) {
      queries = queries.concat(item.query);
    }


    if (item.fragment) {
      fragments = fragments.concat(item.fragment);
    }


    if (item.mutation) {
      mutations = mutations.concat(item.mutation);
    }


  }

  const rootSchema: any = `
   ${scalars}
   ${enums}
   ${interfaces}
   ${types}
   ${unions}
   ${inputs}
   ${fragments}
   type rootQuery {
   ${queries}
   }
   type rootMutation {
   ${mutations}
   }
   schema {
     query: rootQuery
     mutation: rootMutation
   }
   `;


  return rootSchema;
}

