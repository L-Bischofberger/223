package ch.wiss.m223securitsy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

        @GetMapping("public")
    public ResponseEntity<String> getPublicPart(){
        return ResponseEntity.ok("dise ist der public teil ");
    }

}
