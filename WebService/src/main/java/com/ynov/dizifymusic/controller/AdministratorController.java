package com.ynov.dizifymusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public Administrator getAdministrator(final @PathVariable("id") Long adminId) {
    	try {
            return administratorRepository.findById(adminId).get();
        } catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
    
    //DELETE by id
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/administrator/{id}")
    public void deleteAdministrator(final @PathVariable("id") Long adminId) {
    	try {
    		administratorRepository.deleteById(adminId);
    	} catch (Exception e) {
    		System.out.println(e.toString());
        }	
    }
	
    //POST
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/administrator")
    public Administrator addAdministrator(@RequestBody Administrator admin) {
    	try {
    		return administratorRepository.save(admin);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }

    //PUT by id
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @PutMapping("/administrator/{id}")
    public Administrator editAdministrator(@RequestBody Administrator admin) {
    	try {
    		return administratorRepository.save(admin);
    	} catch (Exception e) {
    		System.out.println(e.toString());
            return null;
        }
    }
	
}
