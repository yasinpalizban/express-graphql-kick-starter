export interface GraphqlFunctionInterface {

  decode(): this ;

  manipulate(): this ;


  exchange(): this ;


  getResolver(): string ;


  explode(): this ;

  getMethod():string;
}
