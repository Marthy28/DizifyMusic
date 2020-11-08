package com.ynov.dizifymusic.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Song")
public class Song {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	String name;
	String duration;
	
	void setName(String _name)
	{
		name = _name;
	}
	
	void setDuration(String _duration)
	{
		duration = _duration;
	}

	String getName() {
		return name;
	}

	String getDuration() {
		return duration;
	}
	
}
