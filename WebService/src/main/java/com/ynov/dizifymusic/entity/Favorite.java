package com.ynov.dizifymusic.entity;

import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Favorite")
public class Favorite {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "favorite_id", nullable = true)
	@JsonIgnoreProperties("favorite")
	private User user;
	
	@ManyToMany
	@JsonIgnoreProperties("favorite")
    private Set<Song> songs;
	
	@ManyToMany
	@JsonIgnoreProperties("favorite")
    private Set<Album> albums;
	
	@ManyToMany
	@JsonIgnoreProperties("favorite")
    private Set<Artist> artists;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Song> getSongs() {
		return songs;
	}

	public void setSongs(Set<Song> songs) {
		this.songs = songs;
	}

	public Set<Album> getAlbums() {
		return albums;
	}

	public void setAlbums(Set<Album> albums) {
		this.albums = albums;
	}

	public Set<Artist> getArtists() {
		return artists;
	}

	public void setArtists(Set<Artist> artists) {
		this.artists = artists;
	}
	
}
