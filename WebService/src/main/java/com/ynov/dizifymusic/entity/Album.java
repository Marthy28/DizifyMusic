package com.ynov.dizifymusic.entity;

import java.time.LocalDate;
import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ynov.dizifymusic.config.LocalDateDeserializer;

@Entity
@Table(name = "Album")
@JsonIgnoreProperties("favorites")
public class Album {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String name;
	private String pictureUri;
	@JsonDeserialize(using=LocalDateDeserializer.class)
	private LocalDate releaseDate;
	
	@ManyToOne
	@JoinColumn(name = "artist_id", nullable = false)
	@JsonIgnoreProperties("albums")
    private Artist artist;
	
	
	@ManyToMany
	private Set<Favorite> favorites = new HashSet<Favorite>();
	
	@OneToMany (mappedBy = "album", fetch = FetchType.LAZY,
    cascade = CascadeType.ALL)

	@JsonManagedReference(value="album-song")
	@JsonIgnoreProperties("artist")
	private Set<Song> songs;

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

	public String getPictureUri() {
		return pictureUri;
	}

	public void setPictureUri(String pictureUri) {
		this.pictureUri = pictureUri;
	}

	public LocalDate getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(LocalDate releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Artist getArtist() {
		return artist;
	}

	public void setArtist(Artist _artist) {
		artist = _artist;
	}

	public Set<Favorite> getFavorites() {
		return favorites;
	}

	public void setFavorites(Set<Favorite> favorites) {
		this.favorites = favorites;
	}

	public Set<Song> getSongs() {
		return songs;
	}

	public void setSongs(Set<Song> songs) {
		this.songs = songs;
	}

	
}
