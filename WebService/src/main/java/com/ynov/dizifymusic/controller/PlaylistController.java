package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Playlist;
import com.ynov.dizifymusic.entity.Song;
import com.ynov.dizifymusic.entity.User;
import com.ynov.dizifymusic.repository.PlaylistRepository;
import com.ynov.dizifymusic.repository.SongRepository;
import com.ynov.dizifymusic.repository.UserRepository;

@RestController
public class PlaylistController {
	private PlaylistRepository playlistRepository;
	private UserRepository userRepository;
	private SongRepository songRepository;

    @Autowired
    public PlaylistController(PlaylistRepository playlistRepository, UserRepository userRepository, SongRepository songRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
        this.songRepository = songRepository;
    }
    
    //GET all 
    @GetMapping("/playlist")
    public List<Playlist> getPlaylists() {
    	try {
    		return playlistRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //GET all by id
    @ResponseBody
    @GetMapping("/playlist/{id}")
    public Playlist getPlaylist(final @PathVariable("id") Long playlistId) {
    	try {
            return playlistRepository.findById(playlistId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by user id
    @ResponseBody
    @GetMapping("/playlistByUserId/{user_id}")
    public List<Playlist> getPlaylistByUserId(final @PathVariable("user_id") Long user_id) {
    	try {
            return playlistRepository.findByUserId(user_id);
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    @DeleteMapping("/playlist/{id}")
    public void deletePlaylist(final @PathVariable("id") Long playlistId) {
    	try {
    		playlistRepository.deleteById(playlistId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
    
    //POST
    @ResponseBody
    @PostMapping("/playlist/{user_id}")
    public Playlist addPlaylist(@RequestBody Playlist playlist, final @PathVariable("user_id") Long user_id) {
    	try {	
    		User user = userRepository.findById(user_id).get();
    		if(user == null)
    			return null;
    		
    		playlist.setUser(user);
    		
    		return playlistRepository.save(playlist);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    //add song to playlist by playlist_id and song_id
    @ResponseBody
    @PutMapping("/playlist/{playlist_id}/song/{song_id}/add")
    public Playlist editPlaylist_addSong(final @PathVariable("song_id") Long song_id,final @PathVariable("playlist_id") Long playlist_id) {
    	try {
    		Playlist playlist = playlistRepository.findById(playlist_id).get();
    		if(playlist == null)
    			return null;
    		
    		Song song = songRepository.findById(song_id).get();
    		if(song == null)
    			return null;
    		
    		playlist.getSongs().add(song);
    		
    		return playlistRepository.save(playlist);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
    
  //delete song to playlist by playlist_id and song_id
    @ResponseBody
    @PutMapping("/playlist/{playlist_id}/song/{song_id}/delete")
    public Playlist editPlaylist_deleteSong(final @PathVariable("song_id") Long song_id,final @PathVariable("playlist_id") Long playlist_id) {
    	try {
    		Playlist playlist = playlistRepository.findById(playlist_id).get();
    		if(playlist == null)
    			return null;
    		
    		Song song = songRepository.findById(song_id).get();
    		if(song == null)
    			return null;
    		
    		playlist.getSongs().remove(song);
    		
    		return playlistRepository.save(playlist);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
}
