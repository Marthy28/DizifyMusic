package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ynov.dizifymusic.entity.Favorite;
import com.ynov.dizifymusic.repository.FavoriteRepository;

@RestController
public class FavoriteController {
	private FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteController(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }
    
    //GET all
    @GetMapping("/favorite")
    public List<Favorite> getFavorites() {
    	try {
    		return favoriteRepository.findAll();
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    
    //GET by id
    @ResponseBody
    @GetMapping("/favorite/{id}")
    public Favorite getFavorite(final @PathVariable("id") Integer favoriteId) {
    	try {
            return favoriteRepository.findById(favoriteId).get();
        } catch (Exception e) {
        	System.out.println(e.toString());
            return null;
        }
    }
    
    //GET by user id
    @ResponseBody
    @GetMapping("/favoriteByUserId/{user_id}")
    public List<Favorite> getFavoriteByUser(final @PathVariable("user_id") Long user_id){
    	try {
    		return favoriteRepository.findByUserId(user_id);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    @DeleteMapping("/favorite/{id}")
    public void deleteFavorite(final @PathVariable("id") Integer favoriteId) {
    	try {
    		favoriteRepository.deleteById(favoriteId);
    	} catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }
	
    /*@PostMapping("/favorite_song/{id_user}/{id_song}")
    public void addFavoriteSong(final @PathVariable("id_user") Integer id_user
    		, final @PathVariable("id_song")Integer id_song) 
    {
    	try {
    		Favorite fav = new Favorite();
    		fav.setIdUser(id_user);
    		fav = favoriteRepository.save(fav);
    		favoriteRepository.addFavoriteSong(fav.getId(), id_song);
    	}catch(Exception e) {
    		System.out.println(e.toString());
    	}
    }*/

    //PUT by id
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
}
