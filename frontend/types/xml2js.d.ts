declare module 'xml2js' {
    var parseStringPromise: (xml: string) => Promise<any>;
    export { parseStringPromise };
  }