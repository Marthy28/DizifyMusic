package com.ynov.dizifymusic.entity;

import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Album")
@JsonIgnoreProperties("favorites")
public class Album {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String name;
	private String pictureUri;
	private Date releaseDate;
	
	@ManyToOne
	@JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;
	
	
	@ManyToMany
	private Set<Favorite> favorites = new HashSet<Favorite>();
	
	@OneToMany (mappedBy = "album", fetch = FetchType.LAZY,
    cascade = CascadeType.ALL)

	@JsonManagedReference(value="album-song")
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

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
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
