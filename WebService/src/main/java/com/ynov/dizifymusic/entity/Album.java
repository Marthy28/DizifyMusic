package com.ynov.dizifymusic.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Album")
public class Album {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	String name;
	String pictureUri;
	Date releaseDate;
	
	String getName()
	{
		return name;
	}
	
	String getPictureURI()
	{
		return pictureUri;
	}
	
	Date getDate()
	{
		return releaseDate;
	}
	
	void setName(String _name)
	{
		name = _name;
	}
	
	void setPictureUri(String _name)
	{
		name = _name;
	}
	
	void setDate(Date _date)
	{
		releaseDate = _date;
	}
	
}
