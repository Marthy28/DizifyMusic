package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    
    @GetMapping("/artist")
    public List<Artist> getAuthors() {
        return artistRepository.findAll();
    }
	
}
