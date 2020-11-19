package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Album;
import com.ynov.dizifymusic.entity.Artist;
import com.ynov.dizifymusic.entity.Favorite;
import com.ynov.dizifymusic.entity.Song;
import com.ynov.dizifymusic.repository.AlbumRepository;
import com.ynov.dizifymusic.repository.ArtistRepository;
import com.ynov.dizifymusic.repository.FavoriteRepository;
import com.ynov.dizifymusic.repository.SongRepository;

@RestController
public class FavoriteController {
	private FavoriteRepository favoriteRepository;
	private SongRepository songRepository;
	private AlbumRepository albumRepository;
	private ArtistRepository artistRepository;

    @Autowired
    public FavoriteController(FavoriteRepository favoriteRepository
    		,AlbumRepository albumRepository
    		,ArtistRepository artistRepository
    		,SongRepository songRepository) {
    	
        this.favoriteRepository = favoriteRepository;
        this.albumRepository = albumRepository;
        this.songRepository = songRepository;
        this.artistRepository = artistRepository;
    }
    
    //GET all
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/favorites")
    public List<Favorite> getFavorites() {
    	try {
    		return favoriteRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    
    //GET by id
    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @GetMapping("/favorite/{id}")
    public Favorite getFavorite(final @PathVariable("id") Long favoriteId) {
    	try {
            return favoriteRepository.findById(favoriteId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by user id
    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @GetMapping("/favoriteByUserId/{user_id}")
    public Favorite getFavoriteByUserId(final @PathVariable("user_id") Long user_id){
    	try {
    		return favoriteRepository.findByUserId(user_id);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/favorite/{id}")
    public void deleteFavorite(final @PathVariable("id") Long favoriteId) {
    	try {
    		favoriteRepository.deleteById(favoriteId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }

    //PUT by id
    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{id}")
    public Favorite editFavorite(@RequestBody Favorite favorite) {
    	try {
    		return favoriteRepository.save(favorite);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    

    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{favorite_id}/song/{song_id}/add")
    public Favorite addSongToFavorite(final @PathVariable("favorite_id") Long favorite_id,final @PathVariable("song_id") Long song_id) {
    	try {
    		Favorite fav = this.getFavorite(favorite_id);
    		if(fav == null)
    			return null;
    		
    		Song song = songRepository.getOne(song_id);
    		if(song == null)
    			return null;
    		
    		fav.getSongs().add(song);
    		
    		return favoriteRepository.save(fav);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    

    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{favorite_id}/album/{album_id}/add")
    public Favorite addAlbumToFavorite(final @PathVariable("favorite_id") Long favorite_id,final @PathVariable("album_id") Long album_id) {
    	try {
    		Favorite fav = this.getFavorite(favorite_id);
    		if(fav == null)
    			return null;
    		
    		Album album = albumRepository.getOne(album_id);
    		if(album == null)
    			return null;
    		
    		fav.getAlbums().add(album);
    		
    		return favoriteRepository.save(fav);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    

    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{favorite_id}/artist/{artist_id}/add")
    public Favorite addArtistToFavorite(final @PathVariable("favorite_id") Long favorite_id,final @PathVariable("artist_id") Long artist_id) {
    	try {
    		Favorite fav = this.getFavorite(favorite_id);
    		if(fav == null)
    			return null;
    		
    		Artist artist = artistRepository.getOne(artist_id);
    		if(artist == null)
    			return null;
    		
    		fav.getArtists().add(artist);
    		
    		return favoriteRepository.save(fav);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    

    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{favorite_id}/song/{song_id}/delete")
    public Favorite deleteSongToFavorite(final @PathVariable("favorite_id") Long favorite_id,final @PathVariable("song_id") Long song_id) {
    	try {
    		Favorite fav = this.getFavorite(favorite_id);
    		if(fav == null)
    			return null;
    		
    		Song song = songRepository.getOne(song_id);
    		if(song == null)
    			return null;
    		
    		fav.getSongs().remove(song);
    		
    		return favoriteRepository.save(fav);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    

    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{favorite_id}/album/{album_id}/delete")
    public Favorite deleteAlbumToFavorite(final @PathVariable("favorite_id") Long favorite_id,final @PathVariable("album_id") Long album_id) {
    	try {
    		Favorite fav = this.getFavorite(favorite_id);
    		if(fav == null)
    			return null;
    		
    		Album album = albumRepository.getOne(album_id);
    		if(album == null)
    			return null;
    		
    		fav.getAlbums().remove(album);
    		
    		return favoriteRepository.save(fav);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    

    @PreAuthorize("hasAuthority('USER')")
    @ResponseBody
    @PutMapping("/favorite/{favorite_id}/artist/{artist_id}/delete")
    public Favorite deleteArtistToFavorite(final @PathVariable("favorite_id") Long favorite_id,final @PathVariable("artist_id") Long artist_id) {
    	try {
    		Favorite fav = this.getFavorite(favorite_id);
    		if(fav == null)
    			return null;
    		
    		Artist artist = artistRepository.getOne(artist_id);
    		if(artist == null)
    			return null;
    		
    		fav.getArtists().remove(artist);
    		
    		return favoriteRepository.save(fav);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    
}
