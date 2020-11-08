package com.ynov.dizifymusic.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Playlist")
public class Playlist {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	String name;
	
	@ManyToMany
    private Set<Song> songs = new HashSet<>();
	
	Integer getId()
	{
		return id;
	}
	
	String getName()
	{
		return name;
	}
	
	void setNAme (String _name)
	{
		name = _name;
	}
	
	Set<Song> getSongs()
	{
		return songs;
	}
	
	void setSongs(Set<Song> _songs)
	{
		songs = _songs;
	}
	
}
