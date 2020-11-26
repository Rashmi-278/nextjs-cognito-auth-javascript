import Router from "next/router";
export const redirect = ( path , ctx ) => {
    
    const isClient = !ctx.req;

    if (!isClient) {
        ctx.res.writeHead(302, { Location: path })
        ctx.res.end()
      } else {
        Router.push(path)
      }

}

export const filterByTerm = (inputArr, searchTerm) => {
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(searchTerm);
  });
}

