package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Album;
import com.ynov.dizifymusic.entity.Artist;
import com.ynov.dizifymusic.entity.Song;
import com.ynov.dizifymusic.repository.AlbumRepository;
import com.ynov.dizifymusic.repository.ArtistRepository;
import com.ynov.dizifymusic.repository.SongRepository;

/**
 * Controlleur pour l'entité Album
 */
@RestController
public class AlbumController {
	
	private AlbumRepository albumRepository;
	private ArtistRepository artistRepository;
	private SongRepository songRepository;

    @Autowired
	public AlbumController(AlbumRepository albumRepository,ArtistRepository artistRepository, SongRepository songRepository) {
		this.albumRepository = albumRepository;
		this.artistRepository = artistRepository;
		this.songRepository = songRepository;
	}
	
    //GET all
    @GetMapping("/albums")
    public List<Album> getAlbums() {
    	try {
    		
    		return albumRepository.findAll();
    	
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by id
    @ResponseBody
    @GetMapping("/album/id/{id}")
    public Album getAlbum(final @PathVariable("id") Long albumId) {
    	try {
    		
            return albumRepository.findById(albumId).get();
            
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }

  //GET by name
    @ResponseBody
    @GetMapping("/album/name/{name}")
    public Album getAlbum(final @PathVariable("name") String albumName) {
    	try {
    		
            return albumRepository.findByName(albumName);
            
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    //ADMIN
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/album/{id}")
    public void deleteAlbum(final @PathVariable("id") Long albumId) {
    	try {
    		
    		albumRepository.deleteById(albumId);
    		
    	} catch (Exception e) {
    		System.out.println(e.toString());
        }
    }
    
  //POST 
    //ADMIN
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/album/{artist_id}")
    public Album addAlbum(@RequestBody Album album, @PathVariable("artist_id") Long artist_id) {
    	try {
    		
    		Artist artist = artistRepository.getOne(artist_id);
    		
    		if(artist==null)
    			return null;
    		album.setArtist(artist);
    		
    		return albumRepository.save(album);
    		
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }

    //PUT by id
    //ADMIN
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @PutMapping("/album")
    public Album editAlbum(@RequestBody Album album) { 
    	try {
    		Album currentAlbum = albumRepository.getOne(album.getId());
    		
    		if(currentAlbum == null)
    			return null;
    		
    		if(album.getSongs() != null && !album.getSongs().isEmpty())
    			currentAlbum.setSongs(album.getSongs());
    		
    		if(album.getArtist() != null)
    			currentAlbum.setArtist(album.getArtist());
    		
    		if(album.getName() != null && !album.getName().isEmpty() && !album.getName().isBlank())
    			currentAlbum.setName(album.getName());

    		if(album.getPictureUri() != null && !album.getPictureUri().isEmpty() && !album.getPictureUri().isBlank())
    			currentAlbum.setPictureUri(album.getPictureUri());
    		

    		if(album.getReleaseDate() != null)
    			currentAlbum.setReleaseDate(album.getReleaseDate());
    		
    		return albumRepository.save(currentAlbum);
    		
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //PUT a new song in an album
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @PutMapping("/album/{album_id}/song/{song_id}/add")
    public Album AddSongToAlbum(@PathVariable("album_id") Long album_id,@PathVariable("song_id") Long song_id) { 
    	try { 
    		Album currentAlbum = albumRepository.getOne(album_id);
    		if(currentAlbum == null)
    			return null;
    		
    		Song song = songRepository.getOne(song_id); 
    		if(song == null)
    			return null;
    		
    		song.setAlbum(currentAlbum);
    		songRepository.save(song);
    		
    		return currentAlbum;
    		
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
  //PUT remove a song from an album
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @PutMapping("/album/{album_id}/song/{song_id}/delete")
    public Album DeleteSongToAlbum(@PathVariable("album_id") Long album_id,@PathVariable("song_id") Long song_id) { 
    	try { 
    		Album currentAlbum = albumRepository.getOne(album_id);
    		if(currentAlbum == null)
    			return null;
    		
    		Song song = songRepository.getOne(song_id); 
    		if(song == null)
    			return null;
    		
    		currentAlbum.getSongs().remove(song);
    		albumRepository.save(currentAlbum);
    		
    		song.setAlbum(null);
    		songRepository.save(song);
    		
    		return currentAlbum;
    		
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
	
	
}
