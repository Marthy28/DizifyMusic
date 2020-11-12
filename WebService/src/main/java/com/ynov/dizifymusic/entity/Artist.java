package com.ynov.dizifymusic.entity;

import java.util.*;
import javax.persistence.*;

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
	private Long id;

	@OneToMany (mappedBy = "artist", fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	private Set<Album> albums;

	@OneToMany (mappedBy = "artist", fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	private Set<Song> songs;

	@ManyToMany
	private Set<Favorite> favorites = new HashSet<Favorite>();

	private String name;
	private String imageUri;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Set<Album> getAlbums() {
		return albums;
	}
	public void setAlbums(Set<Album> albums) {
		this.albums = albums;
	}
	public Set<Song> getSongs() {
		return songs;
	}
	public void setSongs(Set<Song> songs) {
		this.songs = songs;
	}
	public Set<Favorite> getFavorites() {
		return favorites;
	}
	public void setFavorites(Set<Favorite> favorites) {
		this.favorites = favorites;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImageUri() {
		return imageUri;
	}
	public void setImageUri(String imageUri) {
		this.imageUri = imageUri;
	}



}