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

import com.ynov.dizifymusic.entity.Artist;
import com.ynov.dizifymusic.repository.ArtistRepository;


@RestController
public class ArtistController {

	private ArtistRepository artistRepository;

    @Autowired
    public ArtistController(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }
    
    //GET all
    @GetMapping("/artists")
    public List<Artist> getArtists() {
    	try {
    		return artistRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by id
    @ResponseBody
    @GetMapping("/artist/id/{id}")
    public Artist getArtist(final @PathVariable("id") Integer artistId) {
    	try {
            return artistRepository.findById(artistId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by name
    @ResponseBody
    @GetMapping("/artist/name/{name}")
    public Artist getArtist(final @PathVariable("name") String artistName) {
    	try {
            return artistRepository.findByName(artistName);
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
   
    //DELETE by id 
    @DeleteMapping("/artist/{id}")
    public void deleteArtist(final @PathVariable("id") Integer artistId) {
    	try {
    		artistRepository.deleteById(artistId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
    
    //POST 
    @PostMapping("/artist")
    public Artist addArtist(@RequestBody Artist artist) {
    	try {
    		return artistRepository.save(artist);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    //PUT by id
    @ResponseBody
    @PutMapping("/artist/{id}")
    public Artist editArtist(@RequestBody Artist artist) {
    	try {
    		return artistRepository.save(artist);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    
}
