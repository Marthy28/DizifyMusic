package com.ynov.dizifymusic.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * Entité Livre persistente en base de données.
 * 
 * @author Matthieu BACHELIER
 * @since 2020-11
 * @version 1.0
 */
@Entity
@Table(name = "Artist")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToMany
    private Set<Album> albums = new HashSet<>();
    
    @ManyToMany
    private Set<Song> songs = new HashSet<>();

    private String name;
    private String imageUri;


    /**
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

   
    /**
     * @return the songs
     */
    public Set<Song> getSongs() {
        return songs;
    }

 
    /**
     * @return the albums
     */
    public Set<Album> getAlbums() {
        return albums;
    }

    
    
    /**
     * @param authors the authors to set
    */ 
    
    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    /**
     * @param authors the authors to set
    */ 
    
    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }
    
    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @param name the name to set
     */
    public void setname(String name) {
        this.name = name;
    }

    public String getImageUri() {
		return imageUri;
	}

	public void setImageUri(String imageUri) {
		this.imageUri = imageUri;
	}

}