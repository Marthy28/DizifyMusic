import React, { FC, useEffect, useState } from 'react';
import artistService from "../services/artistService"

type Artist = {
  id: number,
  name: string,
  image_uri: string,
}

interface ArtistsProps {
}

const ArtistsList : FC<ArtistsProps> = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

   useEffect( () => {
    artistService.getArtists()
    .then(res => {
      const artists = res.data;
      console.log(artists);
      setArtists(artists);
    })
   }, []) 
  
    return (
      <ul>
        { artists.map((artist: { id: React.ReactNode; name: React.ReactNode; image_uri: string | undefined; }, i ) => 
        <>
          <li key={i}>{artist.id}</li>
          <li key={i}>{artist.name}</li>
          <li key={i}><img src={artist.image_uri} style={{height: "30px", width: "30px"}} /></li>
        </>
        )}
      </ul>
    )
}

export default ArtistsList;
