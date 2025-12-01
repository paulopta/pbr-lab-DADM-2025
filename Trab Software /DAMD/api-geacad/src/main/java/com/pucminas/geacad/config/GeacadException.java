package com.pucminas.geacad.config;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GeacadException extends RuntimeException{
    private final HttpStatus httpStatus;

    public GeacadException(String msg, HttpStatus httpStatus) {
        super(msg);
        this.httpStatus = httpStatus;
    }
}
