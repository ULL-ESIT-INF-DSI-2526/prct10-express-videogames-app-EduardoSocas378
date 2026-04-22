import { describe, test, expect } from 'vitest';
import { findArtist, findArtistAlbums } from '../src/ejercicio-pe101/musicApp.js'; 

describe('Pruebas de la Api iTunes', () => {
    test(`findArtist devuelve un artista, proporcionando su nombre y su id`, () => {
      return findArtist("kendrick lamar").then((result:any) => {
        expect(result.name).to.be.eql('Kendrick Lamar')
        expect(result.Id).to.be.eql(368183298)
      })
    })

    test(`findARtist devuelve un error si proporcionamos el nombre de un artista que no existe`, () => {
        return findArtist("Eduardo Socas Luis").catch((err) => {
          expect(err).to.be.equal("Error al obtener resultados de busqueda");
        })
    })

    test(`findArtistAlbums devuelve los albums de un artista, proporcionando su id`, () => {
      return findArtistAlbums(368183298).then((result:any) => {
        expect(result[0].albumName).to.be.eql('GNX')
        expect(result[0].launchYear).to.be.eql('2024')
      })
    })

        test(`findArtistAlbums devuelve un error si proporcionamos el nombre de un artista que no existe`, () => {
        return findArtist("Eduardo Socas Luis").catch((err) => {
          expect(err).to.be.equal("Error al obtener resultados de busqueda");
        })
    })
})