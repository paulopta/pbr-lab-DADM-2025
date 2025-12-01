package com.pucminas.geacad.controllers;

import com.pucminas.geacad.dto.AlunoRequestDTO;
import com.pucminas.geacad.dto.AlunoResponseDTO;
import com.pucminas.geacad.models.Aluno;
import com.pucminas.geacad.services.AlunoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/alunos")

public class AlunoController {
    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> cadastrarAluno(@RequestBody @Valid AlunoRequestDTO alunoRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoService.saveAluno(alunoRequestDTO));
    }

    @PutMapping("/{alunoId}")
    public ResponseEntity<Object> alterarAluno (@RequestBody @Valid AlunoRequestDTO alunoRequestDTO, @PathVariable("alunoId") Integer alunoId ) {
        AlunoResponseDTO alunoResponseDTO = alunoService.atualizarAluno(alunoRequestDTO, alunoId);
        if (alunoResponseDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(alunoResponseDTO);
    }
    @DeleteMapping("/{alunoId}")
    public ResponseEntity<Object> deletarAluno (@PathVariable("alunoId") Integer alunoId ) {
        AlunoResponseDTO alunoResponseDTO = alunoService.deleteAluno(alunoId);
        return ResponseEntity.status(HttpStatus.OK).body(alunoResponseDTO);
    }
    @GetMapping("/all")
    public ResponseEntity<Object> listarAlunos() {
        List<AlunoResponseDTO> listaDeAlunoResponse = alunoService.buscarAlunos();
        return ResponseEntity.status(HttpStatus.OK).body(listaDeAlunoResponse);
    }
    @GetMapping("/{alunoId}")
    public ResponseEntity<Object> buscarAluno(@PathVariable("alunoId") Integer alunoId) {
        AlunoResponseDTO aluno = alunoService.buscarAlunoPorId(alunoId);
        return ResponseEntity.status(HttpStatus.OK).body(aluno);
    }
}
