package com.pucminas.geacad.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ManipuladorExcecoes {
    @ExceptionHandler(GeacadException.class)
    public ResponseEntity<Object> objectNotFound(GeacadException e){

        Map<String, String> corpo = new HashMap<>();

        corpo.put("erro", String.valueOf(e.getHttpStatus().value()));
        corpo.put("mensagem", e.getMessage());

        return ResponseEntity.status(e.getHttpStatus()).body(corpo);
    }
}
