package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ynov.dizifymusic.entity.Song;
import com.ynov.dizifymusic.repository.SongRepository;

public class SongController {
	private SongRepository songRepository;

    @Autowired
    public SongController(SongRepository songRepository) {
        this.songRepository = songRepository;
    }
    
    @GetMapping("/song")
    public List<Song> getArtists() {
    	try {
    		return songRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    @ResponseBody
    @GetMapping("/song/{id}")
    public Song getSong(final @PathVariable("id") Integer songId) {
    	try {
            return songRepository.findById(songId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    @DeleteMapping("/song/{id}")
    public void deleteSong(final @PathVariable("id") Integer songId) {
    	try {
    		songRepository.deleteById(songId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
	
    @PostMapping("/song")
    public Song addSong(@RequestBody Song song) {
    	try {
    		return songRepository.save(song);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    @ResponseBody
    @PutMapping("/song/{id}")
    public Song editSong(@RequestBody Song song) {
    	try {
    		return songRepository.save(song);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
}
