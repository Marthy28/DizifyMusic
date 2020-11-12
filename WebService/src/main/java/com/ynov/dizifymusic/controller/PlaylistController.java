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
import com.ynov.dizifymusic.repository.UserRepository;

@RestController
public class PlaylistController {
	private PlaylistRepository playlistRepository;
	private UserRepository userRepository;

    @Autowired
    public PlaylistController(PlaylistRepository playlistRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
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
    		playlist.setUser(user);
    		return playlistRepository.save(playlist);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }

    //PUT by user id
    @ResponseBody
    @PutMapping("/playlistAddSong/{playlist_id}")
    public Playlist editPlaylist_addSong(@RequestBody Song song,final @PathVariable("playlist_id") Long playlist_id) {
    	try {
    		Playlist playlist = playlistRepository.findById(playlist_id).get();
    		playlist.getSongs().add(song);
    		return playlistRepository.save(playlist);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    		return null;
    	}
    }
}
