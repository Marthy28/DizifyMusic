package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ynov.dizifymusic.entity.Artist;
import com.ynov.dizifymusic.entity.Song;
import com.ynov.dizifymusic.repository.ArtistRepository;
import com.ynov.dizifymusic.repository.SongRepository;

@RestController
@JsonIgnoreProperties("favorites")
public class SongController {
	private SongRepository songRepository;
	private ArtistRepository artistRepository;

    @Autowired
    public SongController(SongRepository songRepository,
    		ArtistRepository artistRepository) {
        this.songRepository = songRepository;
		this.artistRepository = artistRepository;
    }
    
    //GET all
    @GetMapping("/songs")
    public List<Song> getSongs() {
    	try {
    		return songRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by id
    @ResponseBody
    @GetMapping("/song/id/{id}")
    public Song getSong(final @PathVariable("id") Long songId) {
    	try {
            return songRepository.findById(songId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
  //GET by name
    @ResponseBody
    @GetMapping("/song/name/{name}")
    public Song getSong(final @PathVariable("name") String songName) {
    	try {
            return songRepository.findByName(songName);
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/song/{id}")
    public void deleteSong(final @PathVariable("id") Long songId) {
    	try {
    		songRepository.deleteById(songId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
	
    //POST 
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/song/{artist_id}")
    public Song addSong(@RequestBody Song song,final @PathVariable("artist_id") Long artist_id) {
    	try {
    		Artist artist = artistRepository.getOne(artist_id);
    		if(artist == null)
    			return null;
    		
    		song.setArtist(artist);
    		return songRepository.save(song);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    //PUT by id
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/song")
    public Song editSong(@RequestBody Song song) {
    	try {
    		Song currentSong = songRepository.getOne(song.getId());
    		if(currentSong == null)
    			return null;
    		
    		if(song.getName() != null && !song.getName().isEmpty() && !song.getName().isBlank())
    			currentSong.setName(song.getName());
    		
    		if(song.getDuration() != null)
    			currentSong.setDuration(song.getDuration());
    		
    		if(song.getArtist()!=null)
    			currentSong.setArtist(song.getArtist());
    		
    		if(song.getAlbum() != null)
    			currentSong.setAlbum(song.getAlbum());
    		
    		return songRepository.save(currentSong);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
}
