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

import com.ynov.dizifymusic.entity.Administrator;
import com.ynov.dizifymusic.repository.AdministratorRepository;

@RestController
public class AdministratorController {

	AdministratorRepository administratorRepository;

	@Autowired
	public AdministratorController(AdministratorRepository administratorRepository) {
		this.administratorRepository = administratorRepository;
	}

	//GET all
	@GetMapping("/administrator")
    public List<Administrator> getAlbums() {
		try {
			return administratorRepository.findAll();
		} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
	//GET by id
    @ResponseBody
    @GetMapping("/administrator/{id}")
    public Administrator getAdministrator(final @PathVariable("id") Long albumId) {
    	try {
            return administratorRepository.findById(albumId).get();
        } catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    @DeleteMapping("/administrator/{id}")
    public void deleteAdministrator(final @PathVariable("id") Long albumId) {
    	try {
    		administratorRepository.deleteById(albumId);
    	} catch (Exception e) {
    		System.out.println(e.toString());
        }	
    }
	
    //POST
    @PostMapping("/administrator")
    public Administrator addAdministrator(@RequestBody Administrator album) {
    	try {
    		return administratorRepository.save(album);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }

    //PUT by id
    @ResponseBody
    @PutMapping("/administrator/{id}")
    public Administrator editAdministrator(@RequestBody Administrator album) {
    	try {
    		return administratorRepository.save(album);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
	
}
