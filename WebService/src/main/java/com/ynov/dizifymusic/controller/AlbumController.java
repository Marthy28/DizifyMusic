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
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Album;
import com.ynov.dizifymusic.repository.AlbumRepository;

@RestController
public class AlbumController {
	
	private AlbumRepository albumRepository;

    @Autowired
	public AlbumController(AlbumRepository albumRepository) {
		this.albumRepository = albumRepository;
	}
	
    @GetMapping("/album")
    public List<Album> getAlbums() {
    	try {
        return albumRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    @ResponseBody
    @GetMapping("/album/{id}")
    public Album getAlbum(final @PathVariable("id") Integer albumId) {
    	try {
            return albumRepository.findById(albumId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    @DeleteMapping("/album/{id}")
    public void deleteAlbum(final @PathVariable("id") Integer albumId) {
    	try {
    	albumRepository.deleteById(albumId);
    	} catch (Exception e) {
    		System.out.println(e.toString());
        }
    }
	
    @PostMapping("/album")
    public Album addAlbum(@RequestBody Album album) {
    	try {
        return albumRepository.save(album);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }

    @ResponseBody
    @PutMapping("/album/{id}")
    public Album editAlbum(@RequestBody Album album) { 
    	try {
        return albumRepository.save(album);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
	
	
}
