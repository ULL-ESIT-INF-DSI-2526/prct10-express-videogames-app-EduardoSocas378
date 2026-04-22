import request from 'request'

/**
 * Funcion que resuelve una promesa de modo que obtenemos el nombre y el id de un artista a traves de la api de itunes 
 * @param nameOfArtist - nombre del artista a buscar
 * @returns - una promesa que resuelve la peticion con el nombre y el id del artista buscado
 */
export const findArtist = (nameOfArtist: string) => {
  const formatArtistName = nameOfArtist.replace(" ", "+");
  const url = `https://itunes.apple.com/search?term=${formatArtistName}&entity=musicArtist`
  return new Promise((resolve, reject)  => {
    request({ url: url, json: true}, (error, response) => {
      if (error) {
        reject(`Error de conexión con api de iTunes: ${error.message}`)
      } else if (response.body.resultCount === 0) {
        reject(`Error al obtener resultados de busqueda`)
      } else {
        const artistData = response.body
        const result = {
          name: artistData.results[0].artistName,
          Id: artistData.results[0].artistId
        }
        resolve(result);
      }
    })
  })
}

/**
 * funcion que devuelve una promesa que resuelve la lista de albumes de un artista a través de su ID
 * @param artistId - ID de un artista de la base de datos de la api de iTunes
 * @returns - devuelve una promesa que resuelve la peticion con una lista de albumes del artista segun su id
 */
export const findArtistAlbums = (artistId: number) => {
  const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`
  return new Promise((resolve,reject) => {
    request({url: url, json: true}, (error, response) => {
      if (error) {
        reject(`Error de conexion con api de iTunes: ${error.message}`)
      } else if (response.statusCode !== 200) {
        reject(`Error al obtener resutados de busqueda`)
      } else {
        const albumsData = response.body.results
        albumsData.shift()
        const result = albumsData.map((albums: any) => ({
          albumName: albums.collectionName,
          launchYear: albums.releaseDate.substr(0,4)
        }))
        resolve(result)
      }
    })
  })
}

findArtist("kendrick lamar").then((result: any) => {
  console.log(result)
  return findArtistAlbums(result.Id)
}).then((albums) => {
  console.log(albums)
}).catch((error) => {
  console.error(error)
})