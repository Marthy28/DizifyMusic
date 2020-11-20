package com.ynov.dizifymusic.entity;

import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Song")
@JsonIgnoreProperties({"favorites","playlists"})
public class Song {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String name;
	private String duration;
	
	@ManyToMany
	private Set<Playlist> playlists = new HashSet<Playlist>();
	
	@ManyToMany
	private Set<Favorite> favorites = new HashSet<Favorite>();
	
	//modifié
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "artist_id", nullable = false)
	@JsonIgnoreProperties("songs")
    private Artist artist;
	
	//modifié
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "album_id")
	@JsonBackReference(value="album-song")
	private Album album;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Set<Playlist> getPlaylists() {
		return playlists;
	}

	public void setPlaylists(Set<Playlist> playlists) {
		this.playlists = playlists;
	}

	public Set<Favorite> getFavorites() {
		return favorites;
	}

	public void setFavorites(Set<Favorite> favorites) {
		this.favorites = favorites;
	}

	public Artist getArtist() {
		return artist;
	}

	public void setArtist(Artist artist) {
		this.artist = artist;
	}

	public Album getAlbum() {
		return album;
	}

	public void setAlbum(Album album) {
		this.album = album;
	}
	
	
	
}
